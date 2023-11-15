const { Traveller, Location, Trip } = require("../../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const travellers = await Traveller.findAll();
        res.status(200).json(travellers);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newTraveller = await Traveller.create(req.body);
        res.status(201).json(newTraveller);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const traveller = await Traveller.findByPk(req.params.id, {
            include: {
                model: Location,
                through: Trip,
            },
        });
        res.status(200).json(traveller);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const traveller = await Traveller.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json(traveller)
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;
