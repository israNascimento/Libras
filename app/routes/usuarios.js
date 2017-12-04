module.exports = function(app) {
    app.post("/usuarios/cadastro", function(req, res) {
        if (!req.body.email || !req.body.nome || !req.body.titulacao || !req.body.senha || !req.body.repsenha) {
            res.render("cadastro", {message: "Preencha todos os campos!"});
            return;
        }
        if(req.body.senha != req.body.repsenha) {
            res.render("cadastro", {message: "Senhas devem coincidir"});
            return;
        }
        var user = req.body;
        delete user.repsenha;
        
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.UsuarioDAO(connection);

        dao.getUserByEmail(user.email, function(err, response) {
            if(err) {
                console.log(err);
                return;
            }
            if(response.length > 0) {
                res.render("cadastro", { message: "Email já cadastrado"});
                return;               
            }
            dao.save(user, function (error) {
                if (error) {
                    throw error;
                }
                req.session.message = "Usuário cadastrado com sucesso!";
                res.redirect("/");
                connection.end();
            });
        });
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
                res.render("login_novo", {message: "Usuario ou senha invalidos!"});
                return;
            }
            req.session.user = {
               id: result[0]['id'],
               nome:  result[0]['nome']
            }
            res.redirect("/");
        });
        connection.end();
    });

    app.post("/usuarios/logout", function(req, res) {
        req.session.destroy(function() {
            res.redirect("/");
        });
    });

    app.get("/usuarios/login", function(req, res) {
        res.render("login_novo");
    });

    app.get("/usuarios/cadastro", function(req, res) {
        res.render("cadastro");
    });
}