module.exports = function (app) {
    app.get("/", function (req, res) {
        res.redirect("/dashboard");
        return;
    });
    /*        
*/
    app.get("/dashboard", function(req, res) {
        res.render("dashboard.ejs", { user: req.session.user });
    });
}
