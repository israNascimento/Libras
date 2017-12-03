module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.ejs", { title: req.session });
    });
}
