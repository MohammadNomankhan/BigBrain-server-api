const Clarifai = require('clarifai');

const imagePut = (req,res,knex) => {

	const {id} = req.body;	
	knex('users').where('id','=',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	}).catch(err => res.status(400).json('unable to get entries'))

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