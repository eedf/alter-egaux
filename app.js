const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const helmet = require('helmet')
const mysql = require('mysql')
const superagent = require('superagent')
const sha=require('sha1')
const multer = require('multer')
var storage  = multer.diskStorage({
	destination: function (req, file, callback) {
	  callback(null, '/asset/docs');
	},
	filename: function (req, file, callback) {
	  callback(null, file.fieldname);
	}
  });
var upload = multer({ storage : storage}).single('userPhoto');
function sendsms(content){
	superagent.post('https://smsapi.free-mobile.fr/sendmsg')
		.send({user:process.env.SMS_USER,pass:process.env.SMS_PASS,msg:content})
		.end(function(err, res) {
		console.log('Message envoyé le '+ new Date()+" evt = "+content )
	});
}
function getMysqlConnection(){
	return  mysql.createConnection({
		host:process.env.DB_HOST,
		user:process.env.DB_USER,
		password:process.env.DB_USER_PWD,
		database:process.env.DB_NAME})
}
app.use(helmet())
app.use(express.static(__dirname))

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

app.get('/login', (req, res) => {
	sendsms('login url hit')
    res.sendFile(__dirname+ '/views/login.html')
})
app.post('/formulaire', (req, res) => {
	sendsms('formulaire url hit')
	// let ip=req.connection.remoteAddress.split(':')[3]
	// let token = sha(ip)
	// connection=getMysqlConnection()
	// connection.connect()
    // let sqlQuery = 'select id, libelle,nature,chemin,lienhttp, DATE_FORMAT(datereation, "%d/%m/%Y")datecreation,miniature,UPPER(categorie) as categ from document where true'
    // connection.query(sqlQuery,function(err,result){
	// 			if(err) 
	// 				throw err
	// 			else
	// 				res.render(__dirname+ '/views/formulaire.pug',
	// 						{
	// 						token:token,
	// 						list:result,
	// 						widthValue:'10%',
	// 						titre:'Alter-Egaux : Formulaire'
	// 						}
	// 					)
	// 				})
	// connection.end()
	res.render(__dirname+ '/views/formulaire.pug',
							{
							token:'token',
							list:[],
							widthValue:'10%',
							titre:'Alter-Egaux : Formulaire'
							}
						)
})
app.get('/list/:categoryId', (req, res) => {
	sendsms('list document'+ req.params.categoryId +'  url hit')
	if(req.params.categoryId){
		connection=getMysqlConnection()
		connection.connect()
                let param=req.params.categoryId
                let sqlQuery = 'select id, libelle,nature,chemin,lienhttp, DATE_FORMAT(datereation, "%d/%m/%Y")datecreation  from document where categorie=? and true'
                connection.query(sqlQuery,[param],function(err,result){
                        if(err) 
				throw err
			else
				res.render(__dirname+ '/views/list.pug',
	                	{
        	        	list:result,
                		titre:'Alter-Egaux : Liste '+param,
	                	lien:param,
        	        	widthValue:'10%'})
               	})
		connection.end()
        }
})
app.get('/projet',(req,res)=>{
	sendsms('projet url hit')
	res.render(__dirname+ '/views/projet.pug',
		{
			widthValue:'10%',
			paddingvalue:"body {padding-top:5rem;}",
			titre:'Alter-Egaux : Le projet'
		}
	);
})
app.get('/event',(req,res)=>{
	sendsms('event url hit')
	connection=getMysqlConnection()
	connection.connect()
	let param=req.params.categoryId
	let sqlQuery = 'select cheminminiature, cheminaffiche, libelle, lien  from evenement where true'
	connection.query(sqlQuery,[param],function(err,result){
		if(err) 
			throw err
		else
			res.render(__dirname + '/views/event.pug', {
				list:result,
				widthValue: '10%',
				paddingvalue: "body {padding-top:5rem;}",
				titre: 'Alter-Egaux : Evénements'
			});
	connection.end()
		});
})
app.get('/histoire',(req,res)=>{
	sendsms('histoire url hit')
	res.render(__dirname+ '/views/histoire.pug',
			{
				widthValue:'10%',
				paddingvalue:"body {padding-top:5rem;}",
				titre:'Alter-Egaux : Histoire'
			}
		);
})
app.get('/outils',(req,res)=>{
	sendsms('outils url hit')
	res.render(__dirname+ '/views/outils.pug',
			{
				widthValue:'10%',
				paddingvalue:"body {padding-top:5rem;}",
				titre:'Alter-Egaux : Outils de communication'
			}
		);
})

app.post('/savenewdoc',(req,res)=>{
	sendsms('save new doc url hit')
	upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
	//console.log(req.socket.address())
	// let ip=req.connection.remoteAddress.split(':')[3]
	// let token=sha(ip)
	console.log(req.files)
	console.log(req.body)
	res.send("ok")
		/*let param=req.params.categoryId
		let sqlQuery = "select * from document where categorie=? and true" 

		connection.query(sqlQuery,[param],function(err,result){
			if(err) throw err;
			console.log("result : ",result)
		})*/
})




app.listen(8080,function(){
	console.log('serveur ecoutant au port 8080 le ',new Date())
})
