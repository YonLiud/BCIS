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

    const { key } = req.body

    // check if key is in database with permit level 1 or 2
    var user = await User.findOne({ key })
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    if (user.permitLevel < 1) {
        Log.create({
            message: `User ${user.name} tried to access /api/user/all but was denied access`,
        })
        return res.status(401).json({ error: 'Unauthorized' })
    }

    var users = await User.find({})
    return res.status(200).json(users)
    

}