const Clarifai = require('clarifai');

const imagePut = (req,res,knex) => {

	const {id} = req.body;	
	knex('users').where('id','=',id)
	.increment('enteries', 1)
	.returning('enteries')
	.then(enteries => {
		res.json(enteries[0].enteries);
	}).catch(err => res.status(400).json('unable to get enteries'))

}

const app = new Clarifai.App({
 apiKey: '97657ca333b3483aa09f72021562e8d9'
});

const handleApiCall = (req,res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err => res.status(400).json('unable to handle api call'))	
}

module.exports = {
	imagePut,
	handleApiCall
};