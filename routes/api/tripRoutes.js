const { Traveller, Location, Trip } = require("../../models");
const router = require("express").Router();


router.post("/", async (req, res)=> {
    try {
        const trip = await Trip.create(req.body)
        res.status(201).json(trip)
    } catch (err) {
        res.status(500).json(err.message)
    }
})
router.delete("/:id", async (req, res)=> {
    try {
        await Trip.destroy({where: {
            id: req.params.id
        }})
        res.status(204).end()
    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router