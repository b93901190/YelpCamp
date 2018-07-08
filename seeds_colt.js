var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name : "5486739453456", 
        image: "https://farm8.staticflickr.com/7378/11205104734_c785214810.jpg", 
        description:"blan blah blah",
    },
    {
        name : "0983499734", 
        image: "https://farm1.staticflickr.com/107/314845824_6ad168abdd.jpg", 
        description:"abcdefg",
    },
    {
        name  : "9834534",
        image : "https://farm6.staticflickr.com/5791/22983006290_3c690443a4.jpg",
        description : "xxxxxxxx",
    },
    {
        name : "432534534",
        image : "https://farm1.staticflickr.com/63/186301911_4d224af70f.jpg",
        description : "you would like here",
    },
    {
        name : "234245345",
        image : "https://farm6.staticflickr.com/5666/22430847794_37bcb50c50.jpg",
        description : "olde time",
    },
];

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       }else{
           console.log("removed Campgrounds!!!");
           
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, newCampground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a campground");
                        
                        // create a comment
                        var newComment = {
                            text : "This is a good place but no wifi",
                            author : "nerd",
                        };
                        
                        Comment.create(newComment, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                newCampground.comments.push(comment);
                                newCampground.save();
                                console.log("add a new comment");
                            }
                        });
                    }
                });
            });

       }
    });
    
    
}

module.exports = seedDB;