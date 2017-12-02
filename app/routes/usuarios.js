module.exports = function(app) {
    app.post("/usuarios/cadastro", function(req, res) {
        console.log(req.body);
        var user = req.body;
        var connection = app.infra.connectionFactory();
        var dao = new app.infra.UsuarioDAO(connection);
        dao.save(user, function(err) {
            if(err) {
                throw err;
            }
            console.log("Sucesso");
        });
    });

    app.get("/usuario/cadastro", function(req, res) {
        res.render("cadastro");
    });
}