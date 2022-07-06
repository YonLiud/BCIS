var crypto = require("crypto");
import mongoose from 'mongoose';
import { report } from 'process';

import dbConnect from '../../../lib/dbConnect'
import Report from '../../../lib/models/Report'
import { UserSchema } from '../../../lib/models/User';

var User = mongoose.models.User || mongoose.model('User', UserSchema)

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    await dbConnect()

    const { key, URI, comments } = req.body
    var name = 'Anonymous'
    // compare key with user key
    try {
        const user = await User.findOne({ key })
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        name = user.name
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

    var report
    try {
        report = new Report({
            key,
            URI,
            comments,
            createdAt: new Date(),
            name
        })
        await report.save()
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
    return res.status(200).json({ report })
}