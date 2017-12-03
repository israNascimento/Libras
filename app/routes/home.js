module.exports = function (app) {
    app.get("/", function (req, res) {
        if(req.session.user) {
            res.render("index.ejs", {user: req.session.user});
            return;
        }
        res.render("index.ejs");
    });
}
