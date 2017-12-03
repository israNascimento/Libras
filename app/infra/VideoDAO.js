function VideoDAO(connection) {
    this._connection = connection;
}

VideoDAO.prototype.upload = function (video, callback) {
    this._connection.query("INSERT INTO videos SET ?", video, callback);
}

VideoDAO.prototype.categorias = function(callback) {
    this._connection.query("SELECT * FROM categorias", callback);
}

module.exports = function () {
    return VideoDAO;
}