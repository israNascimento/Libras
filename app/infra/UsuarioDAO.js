function UsuarioDAO(connection) {
    this._connection = connection;;
}

UsuarioDAO.prototype.save = function(usuario, callback) {
    this._connection.query("INSERT INTO usuario SET ?", usuario, callback);
}

module.exports = function() {
    return UsuarioDAO;
}