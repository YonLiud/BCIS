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

    const { vkey, name } = req.body

    // check if vkey is in database with permit level 1 or 2
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

    var key = crypto.randomBytes(20).toString('hex');
    try {
        const user = await User.create({ name, key })
        return res.status(201).json(user)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}