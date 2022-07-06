var crypto = require("crypto");

import dbConnect from '../../../lib/dbConnect'
import User from '../../../lib/models/User'

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    await dbConnect()

    const { name } = req.body

    var key = crypto.randomBytes(20).toString('hex');

    try {
        const user = await User.create({ name, key })
        return res.status(201).json(user)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}