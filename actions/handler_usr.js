/*
CREATE TABLE usuarios ( id_usuario SERIAL PRIMARY KEY, usuario VARCHAR(50), password VARCHAR(50));
INSERT INTO usuarios (usuario, password) VALUES ('javier','JavierCG6');
*/

var pg = require('pg');
pg.defaults.ssl = true;

function registrarUsuario(datos, res) {
    pg.connect("postgres://jxrlqajbgaxowo:qH6A8GE1KAPmlH_b75ZIhPA4S1@ec2-54-243-204-74.compute-1.amazonaws.com:5432/d3luhem1o3dt9g", function(err, client) {
    if (err) throw err;
    var query =client.query('INSERT INTO usuarios (usuario, password) VALUES ($1, $2) RETURNING id_usuario', [datos.usuario_reg,datos.pass_reg]);
    var id;
    query.on('row', function(row) {
      id=row.id;
    });
    query.on('end', function() {
      res.redirect('/pages/usuarios');
    });
 	});
	console.log("Registro insertado!");
}

function validarUsuario(datos, res){
  var usuario;
  var password;
    pg.connect("postgres://jxrlqajbgaxowo:qH6A8GE1KAPmlH_b75ZIhPA4S1@ec2-54-243-204-74.compute-1.amazonaws.com:5432/d3luhem1o3dt9g", function(err, client) {
    if (err) throw err;
    //var query = client.query('INSERT INTO usuarios (usuario, password) VALUES ($1, $2) RETURNING id_usuario',
      //[datos.user_name,datos.passwd]);
    var query = client.query('SELECT usuario, password FROM usuarios WHERE usuario = $1',
      [datos.user_name]);
    query.on('row', function(row){
      //console.log("Usuario: " + row.usuario + "   |   Datos.Usuario: " + datos.user_name);
      //console.log("Password: " + row.password + "   |   Datos.Password: " + datos.passwd);
      usuario = row.usuario;
      password = row.password;
    });
    query.on('end', function(){
      if(usuario == datos.user_name && password == datos.passwd){
        console.log("OK!");
        //res.render('./pages/usuarios', {datos, usuario});
        //res.render('./pages/usuarios');
        res.redirect('./pages/usuarios');
      }
      else{
        console.log("Usuario o password incorrectos!!!");
        res.render('./pages/index', {datos, usuario});
      }
    });
  });
}

function obtenerUsuarios(datos, res){
  var data = [];
    pg.connect("postgres://jxrlqajbgaxowo:qH6A8GE1KAPmlH_b75ZIhPA4S1@ec2-54-243-204-74.compute-1.amazonaws.com:5432/d3luhem1o3dt9g", function(err, client) {
    if (err) throw err;
    var query = client.query('SELECT * FROM usuarios');
    query.on('row', function(row){
      //console.log("|   " + row.id_usuario + "   |   " + row.usuario + "   |   " + row.password + "   |");
      //console.log(row);
      data.push(row);
      //console.log(data.length);
    });
    query.on('end', function(){
      res.render('./pages/usuarios', {data})
    });
  });
}

function eliminarUsuario(datos, res) {
    pg.connect("postgres://jxrlqajbgaxowo:qH6A8GE1KAPmlH_b75ZIhPA4S1@ec2-54-243-204-74.compute-1.amazonaws.com:5432/d3luhem1o3dt9g", function(err, client) {
    if (err) throw err;
    var query =client.query('DELETE FROM usuarios WHERE id_usuario = $1', [datos.id]);
    //var id;
    query.on('row', function(row) {
      //id=row.id;
    });
    query.on('end', function() {
      //res.render('./pages/usuarios');
      //res.redirect('./pages/usuarios');
      res.redirect('http://localhost:5000/pages/usuarios');
    });
  });
}

function actualizarUsuario(datos, res) {
    pg.connect("postgres://jxrlqajbgaxowo:qH6A8GE1KAPmlH_b75ZIhPA4S1@ec2-54-243-204-74.compute-1.amazonaws.com:5432/d3luhem1o3dt9g", function(err, client) {
    if (err) throw err;
    var query =client.query('UPDATE usuarios SET usuario = $2, password = $3 WHERE id_usuario = $1', [datos.id_usuario, datos.usuario, datos.password]);
    console.log("datos.id_usuario " + " datos.usuario " + " datos.password");
    query.on('row', function(row) {
    });
    query.on('end', function() {
      res.redirect('./pages/usuarios');
    });
  });
}

exports.registrarUsuario = registrarUsuario;
exports.validarUsuario = validarUsuario;
exports.obtenerUsuarios = obtenerUsuarios;
exports.eliminarUsuario = eliminarUsuario;
exports.actualizarUsuario = actualizarUsuario;