const mongoose = require('mongoose');
const express = require('express')


module.exports = function paginatedMarches(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.countDocuments().exec()) {

            try {
                res.json(await model.find().limit(limit).skip(startIndex)
                    .populate('operation').populate('directeur').populate('lotMarche'))

                next()
            } catch (e) {
                res.status(500).json({ message: e.message })
            }
        }
    }
}
