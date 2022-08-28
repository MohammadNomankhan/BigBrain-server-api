const imagePut = (req,res,knex) => {

	const {id} = req.body;	
	knex('users').where('id','=',id)
	.increment('enteries', 1)
	.returning('enteries')
	.then(enteries => {
		res.json(enteries[0].enteries);
	}).catch(err => res.status(400).json('unable to get enteries'))

}
module.exports = {
	imagePut
};