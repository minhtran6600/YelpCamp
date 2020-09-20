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
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) console.log(err);
        else res.render("campgrounds", {campgrounds: allCampgrounds});
    })
    
});

app.post("/campgrounds", function(req, res) {
    // Get data from form and add to campgrounds array
    // Redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    Campground.create( {
        name: name,
        image: image
    }, function(err, newlyCreated) {
        if (err) console.log(err);
        else res.redirect("/campgrounds");
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(3000, function() {
    console.log("Running YelpCamp on port 3000...");
});