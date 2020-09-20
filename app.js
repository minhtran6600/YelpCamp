var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image:"https://shuttsbuildings.com/wp-content/uploads/2017/01/hunting-camp-web-1.jpg"},
    {name: "Granite Hill", image:"https://i.pinimg.com/originals/60/d9/d7/60d9d7279eef1ebcab89e40a6d9871ed.jpg"},
    {name: "Mountain Goat's Rest", image:"https://i.pinimg.com/originals/d6/2e/90/d62e90bb0edcab3d0703ccf4908d2033.jpg"},
    {name: "Salmon Creek", image:"https://shuttsbuildings.com/wp-content/uploads/2017/01/hunting-camp-web-1.jpg"},
    {name: "Granite Hill", image:"https://i.pinimg.com/originals/60/d9/d7/60d9d7279eef1ebcab89e40a6d9871ed.jpg"},
    {name: "Mountain Goat's Rest", image:"https://i.pinimg.com/originals/d6/2e/90/d62e90bb0edcab3d0703ccf4908d2033.jpg"},
    {name: "Salmon Creek", image:"https://shuttsbuildings.com/wp-content/uploads/2017/01/hunting-camp-web-1.jpg"},
    {name: "Granite Hill", image:"https://i.pinimg.com/originals/60/d9/d7/60d9d7279eef1ebcab89e40a6d9871ed.jpg"},
    {name: "Mountain Goat's Rest", image:"https://i.pinimg.com/originals/d6/2e/90/d62e90bb0edcab3d0703ccf4908d2033.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    // Redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    campgrounds.push({name: name, image: image});
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(3000, function() {
    console.log("Running YelpCamp on port 3000...");
});