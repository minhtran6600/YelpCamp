const   express     = require("express");
const   app         = express();
const   bodyParser  = require("body-parser");
const   mongoose    = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        }
        else {
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

// =====================
// COMMET ROUTES
// =====================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) console.log(err);
        else {
            res.render("comments/new", {campground: campground})
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

app.listen(3000, function() {
    console.log("Running YelpCamp on port 3000...");
});