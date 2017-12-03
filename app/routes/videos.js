module.exports = function(app) {
    app.get("/videos/categoria/:categoria", function(req, res) {
        if (!req.session.user) {
            res.redirect("/");
            return;
        }
        var categoria = req.params.categoria;
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.VideoDAO(connection);
        dao.lista(categoria, function(err, result) {
            if(err) {
                console.log(err);
                return;
            }
            res.render("video.ejs", {videos: result, categoria: categoria});
        });
    });

    app.get("/videos/upload", function(req, res) {
        if (!req.session.user) {
            res.redirect("/");
            return;
        }
        console.log("get");
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
        var video = req.body;
        video["link"] = youtubeId(video.link);
        console.log(youtubeId(video.link));
        video['usuario'] = req.session.user;
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.VideoDAO(connection);
        dao.upload(video, function(err) {
            if(err) {
                res.redirect("/videos/upload");
                return;
            }
            res.redirect("/dashboard");
        });
    });

    function youtubeId(link) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = link.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }
}