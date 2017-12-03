function UsuarioDAO(connection) {
    this._connection = connection;
}

UsuarioDAO.prototype.save = function(user, callback) {
    this._connection.query("INSERT INTO usuario SET ?", user, callback);
}

UsuarioDAO.prototype.login = function(user, callback) {
   var query =  this._connection.query("SELECT * FROM usuario WHERE email=? AND senha=?", [user.email, user.senha], 
        callback);
   console.log(query.sql);
}

module.exports = function() {
    return UsuarioDAO;
}