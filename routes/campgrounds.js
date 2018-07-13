var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function (req, res) {
    // res.render("campgrounds", {campgrounds: campgrounds});
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// create new campground
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    // res.send("post!!")
    var campName = req.body.name;
    var imgUrl = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newCamp = {name: campName, image: imgUrl, description: desc, author: author};
    
    // campgrounds.push(newCamp);
    // create a new campground and save to DB
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");     
        }
    });
    
    // res.redirect("/campgrounds");
    
});

router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

// SHOW - shows more infor about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } else{
        //   console.log(foundCampground);
          res.render("campgrounds/show", {campgrounds: foundCampground});
      }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;