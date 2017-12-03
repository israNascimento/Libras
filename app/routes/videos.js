module.exports = function(app) {
    app.get("/video", function(req, res) {
        res.render("video.ejs");
    });
}