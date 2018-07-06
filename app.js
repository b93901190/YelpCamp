var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/e834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Salmon Creek", image: "https://pixabay.com/get/e834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Salmon Creek", image: "https://pixabay.com/get/e834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e831b20628f2003ed1584d05fb1d4e97e07ee3d21cac104496f0c679a2ecb5bc_340.jpg"},
    ];


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    // res.send("post!!")
    var campName = req.body.name;
    var imgUrl = req.body.image;
    var newCamp = {name: campName, image: imgUrl};
    campgrounds.push(newCamp);
    
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Sever!");
});