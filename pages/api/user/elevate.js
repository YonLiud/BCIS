import mongoose from 'mongoose';


import dbConnect from '../../../lib/dbConnect'
import User from '../../../lib/models/User'

import { LogSchema } from '../../../lib/models/Log';

var Log = mongoose.models.Log || mongoose.model('Log', LogSchema);


export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    await dbConnect()

    const { key, name } = req.body

    // get user from database
    var user = await User.findOne({ key })
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    var target = await User.findOne({ name })
    if (!target) {
        return res.status(404).json({ error: 'User does not exist' })
    }

    // user cannot elevate themselves
    if (user.name === target.name) {
        Log.create({
            message: `${user.name} tried to elevate themselves`
        })
        return res.status(403).json({ error: 'You cannot elevate yourself' })
    }

    //  user cannot elevate if his permit level is lower than 4
    if (user.permitLevel < 4) {
        Log.create({
            message: `${user.name} tried to elevate ${target.name} but was denied access`
        })
        return res.status(403).json({ error: 'Unauthorized' })
    }
    

    if (user.permitLevel <= (target.permitLevel+1)) {
        Log.create({
            message: `${user.name} tried to elevate ${target.name} but their permitLevel was too high`
        })
        return res.status(403).json({ error: 'You cannot elevate someone with one PermitLevel below you or higher than you'})
    }


    // elevate target's permit level
    target.permitLevel = target.permitLevel + 1
    target.save()
    return res.status(200).json({ message: 'User elevated' })
}