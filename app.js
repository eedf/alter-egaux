const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const helmet = require('helmet')
const mysql = require('mysql')
const superagent = require('superagent')
const sha=require('sha1')
const session = require('express-session')
var repo='/asset/actionpics/'
var formidable = require('formidable');
var fs = require('fs');
var sess
app.use(session({secret:'TokenAleaToire',resave:true,saveUninitialized:true,connected:false}))
var user=process.env.SMS_USER;
var pass=process.env.SMS_PASS;

function sendsms(content){
	//superagent.post('https://smsapi.free-mobile.fr/sendmsg')
	 //	.send({user:user,pass:pass,msg:content})
	 // .end(function(err, res) {
		console.log('Message envoyé le '+ new Date()+" evt = "+content )
	//});
}
function getMysqlConnection(){
	return  mysql.createConnection({
		host:process.env.DB_HOST,
		user:process.env.DB_USER,
		password:process.env.DB_USER_PWD,
		database:process.env.DB_NAME})
}
app.use('/',express.static(__dirname+'/asset'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.use(helmet())
app.put('/actions/:id/:publish',function(req,res){
	sendsms("publication d'un projet")
	if(req.params.id && req.params.publish){
		var id =  parseInt(req.params.id)
		var publish = (req.params.publish==="true"?true:false)
		connection=getMysqlConnection()
		connection.connect()
		let sqlQuery='update action set publish=? where id=?'
		connection.query(sqlQuery,[publish,id],function(err,result){
			if(err) {
				throw err
			}
			else{
				res.sendStatus(200)
			}
		})
		connection.end()
	}
});
app.delete('/actions/:id',function(req,res){
	sendsms("suppression d'un projet")
	if(req.params.id){
		var id =  parseInt(req.params.id)
		connection=getMysqlConnection()
		connection.connect()
		let sqlQuery='delete from action where id=?'
		connection.query(sqlQuery,[id],function(err,result){
			if(err) {
				throw err
			}
			else{
				res.sendStatus(200)
			}
		})
		connection.end()
	}
});
app.post('/addaction',function (req, res) {
	sendsms("ajouter un projet à la base de données")
	let projectname=req.body.projectname
	let groupename=req.body.groupname
	let sla = req.body.structure
	let projby = req.body.projby
	let projfor = req.body.projfor
	let dateaction = new Date(req.body.dateaction)
	let theme=req.body.theme
	let descprojet=req.body.descprojet
	let region = req.body.region
	let lieu=req.body.lieu
	let nom=req.body.nom
	let prenom=req.body.prenom
	let partenaires=req.body.partenaires
	let contactmail=req.body.contactmail
	let filename=req.body.filename
	let dateajout=new Date()
	if (req.body.token==sha(req.connection.remoteAddress.split(':')[3])){
		let ip = req.connection.remoteAddress.split(':')[3]
		let sqlQuery = 'insert into action (projectname,groupename,slaname,region,projectby,projectfor,themeofaction,dateofaction,description,lieu,partenaires,contact,nomcontact,prenomcontact,photo,datajout,ipaddress,publish) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,false)'
		
		connection=getMysqlConnection()
		connection.connect()
		connection.query(sqlQuery,[projectname,groupename,sla,region,projby,projfor,theme,dateaction,descprojet,lieu,partenaires,contactmail,nom,prenom,filename,dateajout,ip],function(err,result){
			if(err) {
				throw err
			}
			else{
				res.sendStatus(200)
			}
		})
		connection.end()
	}
})
app.post('/fileupload',function (req, res) {
	sendsms("uploader une image en async")
	var form = new formidable.IncomingForm()
	form.parse(req, function (err, fields, files) {
		var oldpath = files.filetoupload.path
		var newpath = __dirname + repo + files.filetoupload.name
		fs.copyFile(oldpath, newpath, function (err) {
			if (err){
				throw err
			}
		})
		
		fs.unlink(oldpath,function(err){
			if (err){
				res.sendStatus(500)
				throw err
			}
			else
				res.sendStatus(200)
		})
	})
})
app.get('/login', (req, res) => {
	sendsms("Login form reached")
	let ip = req.connection.remoteAddress.split(':')[3]
	let token=sha(ip)
	res.render(__dirname+ '/views/login.pug',{token:token})
})
app.get('/partners', (req, res) => {
	sendsms('partners url hit')
    	res.render(__dirname+ '/views/partners.pug',
				{
				widthValue:'15%',
				titre:'Alter-Egaux : Partenaires'
				}
			)
})
app.get('/list/:categoryId', (req, res) => {
	sendsms('list document'+ req.params.categoryId +'  url hit')
	if(req.params.categoryId){
		connection=getMysqlConnection()
		connection.connect()
		let param=req.params.categoryId
		let sqlQuery = 'select id, libelle,nature,miniature,chemin,lienhttp, DATE_FORMAT(datereation, "%d/%m/%Y")datecreation  from document where categorie=? and true'
		connection.query(sqlQuery,[param],function(err,result){
		if(err) 
			throw err
		else
			res.render(__dirname+ '/views/list.pug',
					{
					list:result,
					titre:'Alter-Egaux : Liste ODD '+param,
					lien:param,
					widthValue:'15%'})
			})
		connection.end()
        }
})
app.get('/projet',(req,res)=>{
	sendsms('projet url hit')
	res.render(__dirname+ '/views/projet.pug',
		{
			widthValue:'15%',
			//paddingvalue:"body {padding-top:5rem;}",
			titre:'Alter-Egaux : Le projet'
		}
	);
})
app.get('/campsbase',(req,res)=>{
	sendsms('camps base url hit')
	let formtoken=sha(req.connection.remoteAddress.split(':')[3])
	res.render(__dirname+ '/views/camps.pug',
		{
			widthValue:'15%',
			//paddingvalue:"body {padding-top:5rem;}",
			token:formtoken,
			titre:'Alter-Egaux : Camps de base'
		}
	);
})
app.get('/event',(req,res)=>{
	sendsms('event url hit')
	connection=getMysqlConnection()
	connection.connect()
	let param=req.params.categoryId
	let sqlQuery = 'select cheminminiature, cheminaffiche,chemininvitation, libelle, lien  from evenement where true'
	connection.query(sqlQuery,[param],function(err,result){
		if(err) 
			throw err
		else
			res.render(__dirname + '/views/event.pug', {
				list:result,
				widthValue: '15%',
 				titre: 'Alter-Egaux : Evénements'
			});
	connection.end()
		});
})
app.get('/histoire',(req,res)=>{
	sendsms('histoire url hit')
	res.render(__dirname+ '/views/histoire.pug',
			{
				widthValue:'15%',
				titre:'Alter-Egaux : Histoire'
			}
		);
})
app.get('/actions',(req,res)=>{
	sendsms('actions url hit')
	connection = getMysqlConnection();
	connection.connect()
	let sqlQuery='select id,groupename,slaname,region,projectby,projectfor,DATE_FORMAT(dateofaction, "%d/%m/%Y")dateofaction,themeofaction,description,lieu,partenaires,prenomcontact,nomcontact, contact,photo,DATE_FORMAT(datajout, "%d/%m/%Y")datajout,ipaddress from action where publish=1'
	let formtoken=sha(req.connection.remoteAddress.split(':')[3])
	connection.query(sqlQuery,function(err,result){
		if(err) 
			throw err
		else
			res.render(__dirname+ '/views/fileform.pug',
				{
					token:formtoken,
					list:result,
					widthValue:'15%',
					titre:'Alter-Egaux : Nos actions'
				}
			)
	})
	connection.end();
})
app.get('/outils',(req,res)=>{
	sendsms('outils url hit')
	connection=getMysqlConnection()
	connection.connect()
	let sqlQuery = 'select libelle,description,lien,apercu,DATE_FORMAT(dateajout, "%d/%m/%Y")dateajout from outil where true'
	connection.query(sqlQuery,function(err,result){
		if(err)
			throw err
		else
			res.render(__dirname+ '/views/outils.pug',
			{
				list:result,
				widthValue:'15%',
				titre:'Alter-Egaux : Outils de communication'
			}
		)
	})
})
app.get('/',(req,res)=>{
	res.render(__dirname+ '/index.pug',
			{
				widthValue:'25%',
				titre:'Alter-Egaux : Accueil'
			}
		);
})
app.get('/listtest',(req,res)=>{
	res.render(__dirname+ '/views/list-test.pug',
			{
				widthValue:'25%',
				titre:'Alter-Egaux : Accueil'
			}
		);
})
app.get('/add/:element',(req,res)=>{//root les url pour les formulaires
	sess = req.session
	if(sess.connected){
		if(req.params.element){
			let element=req.params.element // tool ou event
			let ip = req.connection.remoteAddress.split(':')[3]
			let token=sha(ip)
			if (element=='tool') {
				connection=getMysqlConnection()
				connection.connect()
				let sqlQuery = 'select libelle,description,lien,apercu,DATE_FORMAT(dateajout, "%d/%m/%Y")dateajout from outil where true'
				connection.query(sqlQuery,function(err,result){
					if(err) 
						throw err
					else
						res.render(__dirname+ '/views/addtool.pug',
							{
								list:result,
								token:token,
								widthValue:'15%',
								titre:'Alter-Egaux : Mise à jour outils'
							})
				})
				connection.end();
			}
			else
			if (element=='event') {
				connection=getMysqlConnection()
				connection.connect()
				let param=req.params.categoryId
				let sqlQuery = 'select cheminminiature, cheminaffiche, libelle, lien  from evenement where true'
				connection.query(sqlQuery,[param],function(err,result){
					if(err) 
						throw err
					else
						res.render(__dirname +'/views/addevent.pug',
							{
								list:result,
								token:token,
								widthValue:'15%',
								titre:'Alter-Egaux : Mise à jour événements'
							}
						)
					})
				connection.end();
			}
			else
			if(element=='docodd'){
				connection=getMysqlConnection()
				connection.connect()
				let sqlQuery = 'select id, libelle,nature,chemin,lienhttp, DATE_FORMAT(datereation, "%d/%m/%Y")datecreation  from document where true'
				connection.query(sqlQuery,function(err,result){
					if(err) 
						throw err
					else
						res.render(__dirname+ '/views/adddocodd.pug',
							{
								list:result,
								token:token,
								widthValue:'15%',
								titre:'Alter-Egaux : Mise à jour docs odd'
							}
						)
				})
				connection.end()
			}
			else
			if(element == 'action'){
				// TODO
				connection = getMysqlConnection();
				connection.connect()
				let sqlQuery='select id,groupename,slaname,region,projectby,projectfor,DATE_FORMAT(dateofaction, "%d/%m/%Y")dateofaction,themeofaction,description,lieu,partenaires,contact,nomcontact,prenomcontact,ipaddress,photo,DATE_FORMAT(datajout, "%d/%m/%Y")datajout,ipaddress,publish from action'
				//'select id,groupename,branche,description,lieu,partenaires,contact,photo,DATE_FORMAT(datajout, "%d/%m/%Y")datajout,ipaddress,publish from action'
				connection.query(sqlQuery,function(err,result){
					if(err) 
						throw err
					else
						res.render(__dirname+ '/views/modereraction.pug',
							{
								list:result,
								token:token,
								widthValue:'15%',
								titre:'Alter-Egaux : Modérer les actions'
							}
						)
				})

				connection.end();
			}
		}
		else
			res.redirect("/menu")
		}else{
			res.redirect("/")
	}
})
app.get('/menu',(req,res)=>{
	sess=req.session
	if(sess.connected){
		res.render(__dirname+ '/views/menu.pug',
					{
						widthValue:'15%',
						userlogin:sess.login,
						titre:"Menu administrateur"
					}
			)
	}else{
		res.redirect("/")
	}
})
app.post('/addtool',(req,res)=>{
	//console.log("hit ",res.body)
	sess = req.session
	if(sess.connected){
		let ip = req.connection.remoteAddress.split(':')[3]
		let token=sha(ip)
		if (token == req.body.token){
			connection=getMysqlConnection()
			connection.connect()
			let libelle=req.body.libelle
			let description=req.body.description
			let apercu=req.body.apercu
			let lien=req.body.lien
			let dateajout=new Date()
			let sqlQuery = 'insert into outil (libelle,description,apercu,lien,dateajout) values (?,?,?,?,?)'
			connection.query(sqlQuery,[libelle,description,apercu,lien,dateajout],function(err,result){
				if(err) {
					throw err
				}
				else{
					res.redirect("/add/tool")
				}
			})
		}
	}else{
		res.redirect("/")
	}
})
app.post('/adddocodd',(req,res)=>{
	// sess = req.session
	// if(sess.connected){
	// 	let ip = req.connection.remoteAddress.split(':')[3]
	// 	let token=sha(ip)
	// 	if (token==req.body.token){
	// 		connection=getMysqlConnection()
	// 		connection.connect()
	// 		let libelle=req.body.libelle
	// 		let nature=req.body.nature
	// 		let categorie=req.body.categorie
	// 		let miniature=req.body.miniature
	// 		let chemin=req.body.chemin
	// 		let lien=req.body.lien
	// 		let dateajout=new Date()
	// 		let sqlQuery = 'insert into document (categorie,libelle,nature,chemin,miniature,lienhttp,datereation,user) values (?,?,?,?,?,?,?,?)'
	// 		connection.query(sqlQuery,[categorie,libelle,nature,chemin,miniature,lien,dateajout,"admin"],function(err,result){
	// 			if(err) {
	// 				throw err
	// 			}
	// 			else{
	// 				res.redirect("/add/docodd")
	// 			}
	// 		})
	// 	}
	// }else{
	// 	res.redirect("/")
	// }
})
app.post('/addevent',(req,res)=>{
	sess = req.session
	if(sess.connected){
		let ip = req.connection.remoteAddress.split(':')[3]
		let token=sha(ip)
		if (token==req.body.token){
			connection=getMysqlConnection()
			connection.connect()
			let libelle=req.body.libelle
			let description=req.body.description
			let lien=req.body.lien
			let miniature=req.body.miniature
			let affiche=req.body.affiche
			let dateajout=new Date()
			let sqlQuery = 'insert into evenement (libelle,description,lien,miniature,affiche,dateajout) values (?,?,?,?,?,?)'
			connection.query(sqlQuery,[libelle,description,lien,miniature,affiche,dateajout],function(err,result){
				if(err) {
					throw err
				}
				else{
					res.redirect("/add/docodd")
				}
			})
		}
	}else{
		res.redirect("/")
	}
})
app.post('/auth',(req,res)=>{
	let ip=req.connection.remoteAddress.split(':')[3]
	let token=sha(ip)
	let loginadmin=process.env.LOGIN_ADMIN
	let passwordadmin=process.env.PASS_ADMIN
	//sendsms("Attempting Authentification as email = "+ req.body.email + " and pwd = "+req.body.password)
	console.log(loginadmin," ",passwordadmin)
	console.log("Attempting Authentification as email = "+ req.body.email + " and pwd = "+req.body.password)

	if(req.body.token===token && req.body.email===loginadmin && req.body.password===passwordadmin){
			sess = req.session
			sess.login=loginadmin
			sess.connected=true
			res.render(__dirname+ '/views/menu.pug',
					{
						widthValue:'15%',
						userlogin:loginadmin,
						titre:"Menu administrateur"
					}
			)
		}else{res.redirect('/')}

})
app.get('/listCampsBase',(req,res)=>{
	if (true){//token==req.body.token
		connection=getMysqlConnection()
		connection.connect()
		let query = "select campsName,coordinates,pedago,odd,saison,ressources,adresse,ville,cp,region,partenaires,objectifs,programmes,dateCreation from camps where true";
		connection.query(query,function(err,result){
			if(err) {
				throw err
			}
			else{
				res.send(result)
			}
		})
	}
})
app.post('/addCampsBase',(req,res)=>{
	let ip = req.connection.remoteAddress.split(':')[3]
	let token=sha(ip)
	if (token==req.body.token){
		connection=getMysqlConnection()
		connection.connect()
		let campsName = req.body.campsName
		let coordinates = req.body.coordinate
		let pedago = (typeof(req.body.pedago)!= "undefined") ? req.body.pedago.join(";"):""
		let odd = (typeof(req.body.odd)!= "undefined") ? req.body.odd.join(";") : ""
		let saison = (typeof(req.body.saison)!= "undefined") ?req.body.saison.join(";"):""
		let ressources=req.body.ressources.trim()
		let adresse = req.body.adresse.trim()
		let ville = req.body.ville.trim()
		let cp = req.body.cp.trim()
		let region = req.body.region.trim()
		let partenaires = req.body.partenaires.trim()
		let objectifs = req.body.objectifs.trim()
		let programmes = req.body.programmes.trim()
		let dateajout=new Date()
		let ip = req.connection.remoteAddress.split(':')[3]
		let values =[campsName,coordinates,pedago,odd,saison,ressources,adresse,ville,cp,region,partenaires,objectifs,programmes,ip,dateajout]
		let sqlQuery = 'insert into camps (campsName,coordinates,pedago,odd,saison,ressources,adresse,ville,cp,region,partenaires,objectifs,programmes,adresseIp,dateCreation) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
		connection.query(sqlQuery,values,function(err,result){
			if(err) {
				throw err
			}
			else{
				res.send(values)
			}
		})
		//res.send([coordinates,pedago,odd,saison])
	}
});
app.get('/logout',(req,res)=>{
	sendsms("logout reached")
	sess = req.session
	sess.connected=false
	res.redirect('/')
})
app.listen(8080,function(){
	console.log('serveur ecoutant au port 8080 le ',new Date())
})
