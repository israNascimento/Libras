const app = require('express')();

app.listen(8080, () => {
    console.log("Hello world!");
});

app.get("/", (req, res) => {
    res.end("<b>Hello World!</b>");
});