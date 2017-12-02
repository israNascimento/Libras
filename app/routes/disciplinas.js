module.exports = function(app) {
    app.get("/disciplinas/:disciplina", function (req, res) {
        console.log(req.params);
        res.render("index.ejs", { title: "Mundo!" });
    });
}