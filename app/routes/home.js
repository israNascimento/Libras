module.exports = function (app) {
    app.get("/", function (req, res) {
        if(req.session.user) {
            res.redirect("/dashboard");
            return;
        }
        res.render("login.ejs");
    });

    app.get("/dashboard", function(req, res) {
        if(!req.session.user) {
            res.redirect("/");
            return;
        }
        res.render("dashboard.ejs", { user: req.session.user });
    });
}
