/**
 * gestion du CRUD
 */

const usersModel = require('../db/users.model')
const meetingModel = require('../db/meeting.model')

exports.create = async(req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Wrong model parameter specified"
        })
    }

    let model = req.body.model

    if (model && model === "users") {
        // const rec = new usersModel({
        //     name: req.body.name,
        //     email: req.body.email,
        //     phone: req.body.phone,
        //     pro: req.body.pro
        // })

        // Alternative
        await usersModel.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            pro: req.body.pro
        }).then(() => {
            res.json({
                message: `Success : Users with name ${req.body.name} added`
            })
        }).catch((err) => {
            res.status(500).json({
                message: `Error user already exists whit this name`
            })
        })
    } else if (model && model === "meeting") {
        //     const rec = new meetingModel({
        //         time: req.body.time,
        //         place: req.body.place,
        //         participants: req.body.participants
        //     })
        // }

        // Alternative
        await meetingModel.create({
            time: req.body.time,
            place: req.body.place,
            pstud: req.body.pstud,
            ppro: req.body.ppro
        }).then(() => {
            res.json({
                message: `Success : Meeting with time ${req.body.time} added`
            })
        }).catch((err) => {
            res.status(500).json({
                message: `Error : a problem occured... ${err}`
            })
        })

        // await rec.save()
        // .then((rec)=>{
        //     res.json({
        //         message: `Success : user with name ${rec.name} added`
        //     })
        // })
        // .catch((err)=>{
        //     res.status(500).json({
        //         message: `Error user already exists whit this name`
        // })
    } else {
        return res.status(400).json({
            message: "Wrong model parameter specified or missing model parameter"
        })
    }
}

exports.getAll = async(req, res) => {
    let model = req.params.model
    if (model && model === "users") {
        await usersModel.find()
            .exec()
            .then(record => {
                if (!record) {
                    return res.status(204).send("Doc is empty...")
                }
                res.send(record)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message || "Error 500"
                })
            })

    } else if (model && model === "meeting") {
        await meetingModel.find()
            .populate('pstud ppro')
            .exec()
            .then(reco => {
                if (!reco) {
                    return res.status(204).send('Nor records found...')
                }
                res.send(reco)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message || "Error"
                })
            })
    }
}

exports.getOne = async(req, res) => {
    let model = req.params.model
    if (!req.params.id) {
        return res.status(400).json({
            message: "No ID specified"
        })
    }
    if (model && model === "users") {
        await usersModel.findById(req.params.id)
            .then((rec) => {
                if (!rec) {
                    return res.status(404).json({
                        message: error.message
                    })
                }
                res.json(rec)
            })
            .catch((err) => {
                if (error.kind === 'ObjectId') {
                    res.status(404).json({
                        message: error.message || "Error when creating new record" + req.body.id
                    })
                }
                return res.status(500).json({
                    message: error.message || "Error updating record with ID" + req.body.id
                })
            })
    } else { model && model === "meeting" } {
        await meetingModel.findById(req.params.id)
            .populate('pstud ppro')
            .then((rec) => {
                if (!rec) {
                    return res.status(404).json({
                        message: error.message
                    })
                }
                res.json(rec)
            })
            .catch((err) => {
                if (error.kind === 'ObjectId') {
                    res.status(404).json({
                        message: error.message || "Error when creating new record" + req.body.id
                    })
                }
                return res.status(500).json({
                    message: error.message || "Error updating record with ID" + req.body.id
                })
            })
    }
}

exports.update = async(req, res) => {
    let model = req.body.model
    if (!req.params.id) {
        return res.status(400).json({
            message: "No ID specified..."
        })
    }
    if (model && model === "users") {
        await usersModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                pro: req.body.pro
            })
            .then((recUpdate) => {
                if (!recUpdate) {
                    return res.status(404).json({
                        message: error.message || "Record not found with ID" + req.body.id
                    })
                }
                res.json(recUpdate)
            })
            .catch((error) => {
                if (error.kind === 'ObjectId') {
                    res.status(404).json({
                        message: error.message || "Error when creating new record" + req.body.id
                    })
                }
                return res.status(500).json({
                    message: error.message || "Error updating record with ID" + req.body.id
                })
            })
    } else if (model && model === "meeting") {
        await meetingModel.findByIdAndUpdate(req.params.id, {
                time: req.body.time,
                place: req.body.place,
                pstud: req.body.pstud,
                ppro: req.body.ppro
            })
            .then((recUpd) => {
                if (!recUpd) {
                    return res.status(404).json({
                        message: error.message || "Record not found with ID" + req.body.id
                    })
                }
                res.json(recUpd)
            })
            .catch((error) => {
                if (error.kind === 'ObjectId') {
                    res.status(404).json({
                        message: error.message || "Error when creating new record" + req.body.id
                    })
                }
                return res.status(500).json({
                    message: error.message || "Error updating record with ID" + req.body.id
                })
            })
    }
}

exports.delete = async(req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: "No ID specified..."
        })
    }
    let model = req.params.model
    if (model && model === "users") {
        await usersModel.findByIdAndDelete(req.params.id)
            .then(record => {
                if (!record) {
                    return res.status(204).send("No records found...")
                }
                res.send(record)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message || "Error 500"
                })
            })

    } else if (model && model === "meeting") {
        await meetingModel.findByIdAndDelete(req.params.id)
            .then(reco => {
                if (!reco) {
                    return res.status(204).send('No records found...')
                }
                res.send(reco)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message || "Error"
                })
            })
    }
}