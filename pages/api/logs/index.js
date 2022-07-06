var crypto = require("crypto");

import dbConnect from '../../../lib/dbConnect'
import User from '../../../lib/models/User'
import Log from '../../../lib/models/Log'

export default async function handler (req, res) {
    await dbConnect()

    var logs = await Log.find({})
    return res.status(200).json(logs)
}