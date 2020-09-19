var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Salmon Creek", image:"https://media.timeout.com/images/105658702/1372/1029/image.jpgcamp"},
        {name: "Granite Hill", image:"https://www.jweekly.com/wp-content/uploads/2020/03/CAMPStawonga-cabins1WEB.jpg"},
        {name: "Mountain Goat's Rest", image:"https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png"}
    ];

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    res.send("You hit the post");
    // Get data from form and add to campgrounds array
    // Redirect back to campgrounds page
});

app.listen(3000, function() {
    console.log("Running YelpCamp on port 3000...");
});