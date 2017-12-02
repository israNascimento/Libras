module.exports = function(app) {
    app.post("/usuarios/cadastro", function(req, res) {
        console.log(req.body);
    });

    app.get("/usuario/cadastro", function(req, res) {
        res.render("cadastro");
    });
}