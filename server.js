// load the things we need
var express = require('express');
var app = express();
var handler_usr = require('./actions/handler_usr');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', (process.env.PORT || 5000));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

app.post('/users', urlencodedParser,function(req, res) {
	response = {
	   	user_name:req.body.user_name,
		passwd:req.body.passwd
	};
	handler_usr.validarUsuario(response,res);
});

app.get('/pages/usuarios', urlencodedParser,function(req, res) {
	handler_usr.obtenerUsuarios(response,res);
});

app.post('/registrar', urlencodedParser, function(req, res){
	response = {
	   	usuario_reg:req.body.usuario_reg,
		pass_reg:req.body.pass_reg
	};
	console.log("Registrar...");
	handler_usr.registrarUsuario(response,res);
});

app.get('/pages/delete/:id', function(req, res){
	//console.log(JSON.stringify(req.));
	console.log(req.params.id);
	response = {
	   	id:req.params.id
	};
	console.log("Eliminando...");
	handler_usr.eliminarUsuario(response, res);
	//handler_usr.registrarUsuario(response,res);
});

app.post('/modificar', urlencodedParser, function(req, res){
	response = {
		id_usuario:req.body.id_usuario_mod,
	   	usuario:req.body.usuario_mod,
		password:req.body.pass_mod
	};
	console.log("Modificando...");
	handler_usr.actualizarUsuario(response,res);
});


app.listen(app.get('port'));
console.log(app.get('port')+' is the magic port');