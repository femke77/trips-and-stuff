const { Traveller, Location, Trip } = require("../../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const locations = await Location.create(req.body);
    res.status(201).json(locations);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const locations = await Location.findByPk(req.params.id, {
        include: {
            model: Traveller,
            through: Trip
        }
    })

    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
   await Location.destroy( {
       where: {
        id: req.params.id
       }
    })

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
