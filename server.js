const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors())

const db = {

	users: [
		{
			id: '123',
			name: "Andrei",
			email: "andrei@gmail.com",
			password: "mentor",
			enteries: 0,
			joined: new Date()
		},
		{
			id: '258', 
			name: "Noman",
			email: "noman@gmail.com",
			password: "student",
			enteries: 0,
			joined: new Date()
		}

	]

}	
		
	
// Root
app.get('/', (req, res) => {
	res.send(db.users);
})

// Sign in
app.post('/signin', async (req, res) => {

	// const {email,password} = req.body;


	if(db.users[0].email === req.body.email &&
		db.users[0].password === req.body.password){

		res.json(db.users[0]);
		// res.json('success')
	} else{
		res.status(404).json('user not found');
	}

	// console.log(password);
	// console.log(db.users[2].password);
	// console.log(await bcrypt.compare(password, db.users[2].password));

	// if(await bcrypt.compare(password, db.users[2].password)){
	// 	res.json("horrayyyyy");
	// } else {
	// 	res.status(400).json("go register yourself");
	// }

	// res.json("sucessfully signed in")
})

// Register
app.post('/register', (req, res) => {

	// console.log(password);
	// const salt = await bcrypt.genSalt();
	// const hashedPass = await bcrypt.hash(password, salt, null, function(err, hash) {
 //    	return hash;
	// });

	db.users.push(
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			id: '362',
			enteries: 0,
			joined: new Date()
		}

	)
	res.json(db.users[db.users.length - 1]);
})

// profile/:if

app.get('/profile/:id', (req ,res) => {
	const {id} = req.params;
	let found = false;

	db.users.forEach((user) => {
		if(user.id === id){
			found = true;
			return (res.send(user));
		} 
	})
	if (!found){
		res.status(404).json('not found');
	}

})

// image
app.put('/image', (req,res) => {
	const {id} = req.body;
	let found = false;

	db.users.forEach((user) => {
		if(user.id === id){
			found = true;
			user.enteries++;
			return (res.json(user.enteries));
		}
	})
	if(!found){
		res.status(404).json('not found');
	}
})

app.listen(3000, () => {
	console.log("runnig bro")
})

/*

/ --> sucess(GET)
/signin --> sucess/failure (POST)
/register --> user (POST)
/profile/:userId --> user (GET)
/image --> user (PUT)

*/