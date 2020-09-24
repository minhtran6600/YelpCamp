var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    })
});

router.post("/", function(req, res) {
    // Get data from form and add to campgrounds array
    // Redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    Campground.create( {
        name: name,
        image: image,
        description: desc
    }, function(err, newlyCreated) {
        if (err) console.log(err);
        else res.redirect("/campgrounds");
    })
});

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        }
        else {
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

module.exports = router;
