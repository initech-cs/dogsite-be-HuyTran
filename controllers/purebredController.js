const Purebred = require("../models/purebredModel")

exports.createPurebred = async (req, res, next) => {
    try {
        const {name, breed, images, age, height, weight, is_available, litter, gender} = req.body;
        if (!name || !breed || !images || !age || !height || !weight || !is_available || !litter || !gender) {
          return res.status(401).json({
            status: "fail",
            message: "Missing somethingsss",
          });
        }
    
        const purebred = await Kennel.create({
            name, breed, images, age, height, weight, is_available, litter, gender, kennel: req.kennel
        });
    
        res.status(201).json({ status: "success", data: purebred });
      } catch (err) {
        res.status(401).json({
          status: "fail",
          message: err.message,
        });
      }
    
}