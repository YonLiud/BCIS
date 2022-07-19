var crypto = require("crypto");
import mongoose from 'mongoose';
import { report } from 'process';

import dbConnect from '../../../../lib/dbConnect'
import Report from '../../../../lib/models/Report'
import { UserSchema } from '../../../../lib/models/User';

var User = mongoose.models.User || mongoose.model('User', UserSchema)

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    await dbConnect()

    const { key, tags } = req.body

    // get if user is authorized
    var user = await User.findOne({ key })
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    if (user.permitLevel < 5) {
        // return all reports with key and tags
        try {
            const reports = await Report.find({ key, tags })
            if (!reports) {
                return res.status(404).json({ error: 'None Found' })
            }

            // return reports without key   
            var reportsWithoutKey = []
            for (var i = 0; i < reports.length; i++) {
                var report = reports[i]
                delete report.key
                reportsWithoutKey.push(report)
            }
            return res.status(200).json({ reports: reportsWithoutKey })
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
    else {
        // return all reports with tags
        try {
            const reports = await Report.find({ tags })
            if (!reports) {
                return res.status(401).json({ error: 'Unauthorized' })
            }

            // return reports without key   
            var reportsWithoutKey = []
            for (var i = 0; i < reports.length; i++) {
                var report = reports[i]
                delete report.key
                reportsWithoutKey.push(report)
            }
            return res.status(200).json({ reports: reportsWithoutKey })
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    
}