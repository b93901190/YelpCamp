var Campground = require("../models/campground");
var Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
           if(err){
               res.redirect("/campgrounds");
           } else{
               // does this user own this campground?
               if(foundCampground.author.id.equals(req.user._id)){
                //   res.render("campgrounds/edit", {campground: foundCampground});
                next();
               } else{
                //   res.send("you do not have the right to do this action");
                res.redirect("back");
               }
           }
        });
    } else{
        // res.send("you need to login first");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
           if(err){
               res.redirect("/campgrounds");
           } else{
               // does this user own this campground?
               if(foundComment.author.id.equals(req.user._id)){
                //   res.render("campgrounds/edit", {campground: foundCampground});
                    next();
               } else{
                //   res.send("you do not have the right to do this action");
                    res.redirect("back");
               }
           }
        });
    } else{
        // res.send("you need to login first");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};



module.exports = middlewareObj;
