var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function (req, res) {
    // res.render("campgrounds", {campgrounds: campgrounds});
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});


app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    // res.send("post!!")
    var campName = req.body.name;
    var imgUrl = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: campName, image: imgUrl, description: desc};
    
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

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs");
});


// SHOW - shows more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           res.render("show", {campgrounds: foundCampground});
       }
    });
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Sever!");
});
