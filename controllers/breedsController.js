const Breed = require("../models/breedModel")

exports.getBreedList = async (req, res, next) => {
    try{
        const breed = await Breed.find({})
        res.status(201).json({ status: "success", data: breed });
      }catch(err){
        res.status(401).json({
          status: "fail",
          message: err.message,
        })
      }
}


exports.getBreedListById = async (req, res, next) => {
    try{
        console.log("dsafasfda")
        if(!req.params.sid) { 
            return res.status(401).json({
            status: "fail",
            message: "Not found",
          })
        }
        const breedById = await Breed.findOne({sid: req.params.sid})
        res.status(201).json({ status: "success", data: breedById });
      }catch(err){
        res.status(401).json({
          status: "fail",
          message: err.message,
        })
      }
}


exports.filterBreeds = async(req, res, next) => {
  
  const {breedgroup, temperament} = req.query

  let queries = []

  if(breedgroup){
    // return res.json({
    //   data: await Breed.find({})
    // })
    queries.push({breedGroup: {$eq:breedgroup}})
  }

  const finalQuery = queries.length == 0 ? {} : {$and: queries}

  const filterBreed = await Breed.find(finalQuery)

  res.status(201).json({
    status: "success",
    data: filterBreed
  })
}