var express    = require("express"), 
    app        = express(), 
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds_colt");

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// seedDB();

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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } else{
        //   console.log(foundCampground);
          res.render("show", {campgrounds: foundCampground});
      }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Sever!");
});
