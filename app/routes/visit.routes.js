module.exports = app => {
    const visits = require("../controllers/visit.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Visit
    router.post("/", visits.create);
    
    // Retrieve visits of a single Patient with id
    router.get("/:id", visits.findAllForOne);

  
    app.use('/api/visits', router);
  };