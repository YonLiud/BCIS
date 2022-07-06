var crypto = require("crypto");

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
    
    // get selfuser from database
    var meuser = await User.findOne({ key })
    if (!meuser) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    if (meuser.permitLevel < 1) {
        Log.create({
            message: `User ${meuser.name} tried to access /api/user/new but was denied access`,
        })
        return res.status(401).json({ error: 'Unauthorized' })
    }
    console.log("name" + name)
    var target = await User.findOne({ name })
    console.log("target" + target)
    if (!target) {
        return res.status(404).json({ error: 'User does not exist' })
    }
    // check if user's permit level is high enough to delete target
    if (meuser.permitLevel <= target.permitLevel) {
        Log.create({
            message: `User ${meuser.name} tried to delete user ${target.name} but was denied access`,
        })
        return res.status(401).json({ error: 'Unauthorized' })
    }
    // check if user is trying to delete themselves
    if (meuser.name === target.name) {
        Log.create({
            message: `User ${meuser.name} tried to delete themselves`,
        })
        return res.status(401).json({ error: 'Unauthorized' })
    }
    // delete user
    try {
        await target.remove()
        return res.status(200).json({ message: 'User deleted' })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
    
}