const express = require('express')
const router = express.Router()
const axios = require('axios')
//fad34baee5e84580a347aa0f0714a6ee


router.route('/').get(function(request, response) {
    response.send('Hello World')
})

router.route('/news').get(function(request, response) {
	axios.get('https://newsapi.org/v2/everything?sources=nhl-news&apiKey=fad34baee5e84580a347aa0f0714a6ee')
			.then((resp)=>response.send(resp.data))
})
router.route('/news/:id').get(function(request, response) {
	let id = request.params.id.substring(3,request.params.id.length);
	console.log(request.params.id);
	axios.get('https://newsapi.org/v2/everything?sources=nhl-news&apiKey=fad34baee5e84580a347aa0f0714a6ee')
			.then((resp)=>response.send(resp.data.articles[id]));
})

module.exports = router
