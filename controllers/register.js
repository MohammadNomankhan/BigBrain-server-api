const handleRegister = (req,res,knex,bcrypt) => {

	const {name, email, password} = req.body;

	if(!email || !name || !password){
		return res.status(400).json('oops, unable to register')
	}

	const salt = bcrypt.genSaltSync();
	const hasPas = bcrypt.hashSync(password, salt);
	
	knex.transaction(trx => {
		trx.insert({
			hash: hasPas,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0].email,
					name: name,
					joined: new Date()
				})
				.then(user => {
					res.json(user[0])
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'));
} 

module.exports = {
	handleRegister
};