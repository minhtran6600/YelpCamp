const   express     = require("express");
const   Mongoose    = require("mongoose");
const   app         = express();
const   bodyParser  = require("body-parser");
const   mongoose    = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema Set-up
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Graphite Cave",
//     image: "https://assets.atdw-online.com.au/images/c91e5862d9af9aebab1d4653274dd13e.jpeg?rect=0,0,2500,1875&w=745&h=559&&rot=360",
//     description: "A Cave with beautiful Graphite to See"
// }, function(error, campground) {
//     if (error) console.log(error);
//     else console.log(campground);
// })

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) console.log(err);
        else res.render("index", {campgrounds: allCampgrounds});
    })
    
});

app.post("/campgrounds", function(req, res) {
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

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    var campground = Campground.findById(req.params.id, function(error, foundCampground) {
        if (error) {
            console.log(err);
        }
        else {
            res.render("show", {campground:foundCampground});
        }
    });
});

app.listen(3000, function() {
    console.log("Running YelpCamp on port 3000...");
});