var crypto = require("crypto");
import mongoose from 'mongoose';
import { report } from 'process';

import dbConnect from '../../../../lib/dbConnect'
import Report from '../../../../lib/models/Report'

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    await dbConnect()

    const { key } = req.body

    // find all reports with key
    try {
        const reports = await Report.find({ key })
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