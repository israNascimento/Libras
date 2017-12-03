function UsuarioDAO(connection) {
    this._connection = connection;
}

UsuarioDAO.prototype.save = function(user, callback) {
    this._connection.query("INSERT INTO usuario SET ?", user, callback);
}

UsuarioDAO.prototype.login = function(user, callback) {
    this._connection.query("SELECT * FROM usuario WHERE email=? AND senha=?", [user.email, user.senha], 
        callback);
}

UsuarioDAO.prototype.getUserByEmail = function(email, callback) {
    this._connection.query("SELECT * FROM usuario WHERE email=?", email,
        callback);
}

module.exports = function() {
    return UsuarioDAO;
}