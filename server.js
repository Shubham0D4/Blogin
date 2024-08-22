const express = require("express");
const db = require("./Database/queries")
const func = require("./function")
const bodyParser = require('body-parser');
const flash = require("express-flash")
const session = require("express-session");
const PORT = process.env.PORT || 8080;
const path = require('path');
var id="";

const app = express();
app.use(session({
  secret: 'alphashubham', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, 
    sameSite: 'None' 
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(flash());

app.get('/', (req, res)=>{
	res.cookie('connect.sid', 'value', {
		sameSite: 'None',
		secure: true, 
		httpOnly: true 
	  });
	res.render('index')
});

// For log in page button
app.get('/login', (req, res)=>{
	res.render('login', {alert:""})
});

//For sign in page button
app.get('/signin', (req, res)=>{
	res.render('signin')
});

// for sign in actuall page
app.post("/signdata", async (req, res) => {
	try {
	  const inc = Math.floor(100000 + Math.random() * 900000).toString();
	  const user_data = req.body;
	  id = user_data.fname[0]+user_data.mname[1]+user_data.lname[2]+user_data.email[3]+inc;
	  if(user_data.password!=user_data.cpassword){
		  res.render("error")
		}else{
			// console.log(user_data)
			const ans = await db.insertuser(id, user_data);
			// console.log(ans);
			if (ans) {
				res.render("login", { alert: "User exists already! Login here" });
			} else {
				const ans = {
					id:id,
					firstName:user_data.fname,
					midName:user_data.mname,
					lastName:user_data.lname,
					mail:user_data.email
				}
				await db.addincre();
				const data = await db.getwarticle(user_data.id);
				data.unshift(ans);
	  			res.render("profile", {data});

	  		}
	  	}
	} catch (err) {
	  console.error(err);
	  res.status(500).render("error");
	}
});
app.get('/tologin', (req, res)=>{
	const alert = [];
	res.render('login', {alert});
})
app.get('/tosignin', (req, res)=>{
	res.render('signin');
})
app.post('/logindata', async (req, res)=>{
	try{
		const user_data = req.body;
		const ans = await db.checkuser(user_data);
		const art = await db.getwarticle(user_data.id);
		const data = ans.concat(art);
		// console.log(art);
		if(ans.length>0){
			res.render('profile', {data});
		}else{
			res.render('login', {alert: "User does not exist! Sign up here"});
		}
	}catch(err){
		console.error(err);
		res.status(500).render('error');
	}
})
app.post('/delete-user', async(req, res)=>{
	try{
		const uid = req.body;
		await db.deleteuser(uid.userid);
		res.render('signin')
	}catch(err){
		console.error(err);
		res.status(500).render('error');
	}
})
app.get('/article/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		const data = await db.getarticle(uid);
		res.render('article', {article:data[0]});
	}catch(err){
		console.error(err);
		res.status(500).render('error');
	}
})
app.get('/read/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		const articles = await db.getAllArticles(uid);
		res.render('read', {articles});
	} catch(err) {
		console.log(err)
		res.status(500).render('error');

	}
})
app.get('/getback/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		const ans = await db.getUser(uid);
		const art = await db.getwarticle(uid);
		const data = ans.concat(art);
		res.render('profile', {data});
	} catch (err) {
		console.log(err);
		res.status(500).render('error');
	}
})
app.get('/write/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		res.render('write', {user:uid});
	} catch (err){
		console.log(err)
		res.status(500).render('error');
	}
})
app.post('/writeArticle/:id', async(req, res)=>{
	try{
		const inc = Math.floor(100 + Math.random() * 900).toString();
		const str = func.generateRandomString();
		const aid = inc.concat(str)
		const uid = req.params.id;
		const article = req.body;
		// console.log(article);
		await db.setwarticle(uid, article, aid);
		const user = await db.getUser(uid);
		res.redirect(`/profile/${user[0].id}`);
	} catch (err){
		console.log(err);
		res.status(500).render('error');
	}
})
app.get('/delete-art/:id', async(req, res)=>{
	try{
		const aid = req.params.id;
		const user = await db.userbyartid(aid);
		const art = await db.getwarticle(user[0].id);
		await db.deletearticle(aid);
		const data = user.concat(art);
		res.redirect(`/profile/${user[0].id}`);
	} catch(err){
		console.log(err);
		res.status(500).render('error');
	}
})
app.get('/profile/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		const user = await db.getUser(uid);
		const art = await db.getwarticle(uid);
		const data = user.concat(art);
		res.render('profile', {data});
	} catch (err){
		console.log(err);
		res.status(500).render('error');
	}
})
app.get('/update-art/:id', async(req, res)=>{
	try{
		const aid = req.params.id;
		await db.upaccess(aid);
		const uid = await db.userbyartid(aid)
		res.redirect(`/profile/${uid[0].id}`);

	} catch(err){
		console.log(err);
		res.status(500).render('error');
	}
})
app.get('/seek/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		const data = await db.allusers(uid);
		res.render('users', {data});
	} catch (err) {
		console.log(err);
		res.status(500).render('error');
	}
})
app.get('/user/:id', async(req, res)=>{
	try{
		const uid = req.params.id;
		const user = await db.getUser(uid);
		const art = await db.getwarticle(uid);
		const data = user.concat(art);
		res.render('person', {data});
	} catch (err){
		console.log(err);
		res.status(500).render('error');
	}

})
app.get('/readme/:id', async(req, res)=>{
	try{
		const aid = req.params.id;
		const data = await db.getarticle(aid);
		res.render('blog', {data});
	} catch(err){
		console.log(err);
		res.status(500).render('error');
	}
})

app.listen(PORT,
	console.log(`Server started on port ${PORT}`)
);
