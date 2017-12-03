module.exports = function(app) {
    app.post("/usuarios/cadastro", function(req, res) {
        var user = req.body;
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.UsuarioDAO(connection);
        dao.save(user, function(err) {
            if(err) {
                throw err;
            }
        });
        connection.end();

    });

    app.post("/usuarios/login", function(req, res) {
        if(!req.session.user) {
            req.session.user = 0;
        }

        var user = req.body;
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.UsuarioDAO(connection);
        dao.login(user, function(err, result) {
            if(err) {
                res.end("Ocorreu um erro no banco de dados!"+err);
                return;
            }
            if(result.length <= 0) {
                res.render("login", {message: "Usuario ou senha invalidos!"});
                return;
            }
            req.session.user = result[0]['id'];
            res.redirect("/");
        });
        connection.end();
    });

    app.post("/usuarios/logout", function(req, res) {
        req.session.destroy(function() {
            res.render("login", {message: "Usuario desconectado com sucesso!"});
        });
    });

    app.get("/usuarios/login", function(req, res) {
        res.render("login");
    });

    app.get("/usuarios/cadastro", function(req, res) {
        res.render("cadastro");
    });
}