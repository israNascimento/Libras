module.exports = function(app) {
    app.get("/video", function(req, res) {
        res.render("video.ejs");
    });

    app.get("/videos/upload", function(req, res) {
        if (!req.session.user) {
            res.redirect("/");
            return;
        }
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.VideoDAO(connection);
        dao.categorias(function(err, result) {
            if(err) {
                res.end("Erro com o banco de dados");
                return;
            }
            res.render("videoupload.ejs", {categorias: result});
        });
    });

    app.post("/videos/upload", function(req, res) {
        if (!req.session.user) {
            res.redirect("/");
            return;
        }
        console.log(req.body);
        var video = req.body;
        video['usuario'] = req.session.user;
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.VideoDAO(connection);
        dao.upload(video, function(err) {
            if(err) {
                console.log(err);
                res.redirect("/videos/upload");
                return;
            }
            res.redirect("/dashboard");
        });
    });
}