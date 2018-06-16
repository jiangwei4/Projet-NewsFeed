const express = require('express')
const router = express.Router()
const axios = require('axios')
const WebSocket = require('ws')
//fad34baee5e84580a347aa0f0714a6ee



	 
const ws = new WebSocket('ws://localhost:8888')



function sendMessage(msg){
	 ws.send(msg);
}




 
let ancien;
let boolNouveau = true;


function tester(raw){
		if(!objectEquals(raw, ancien)){
			sendMessage("#")
		}
		ancien = raw;
		boolNouveau=false;
		return raw;
	}	
	
//compare deux json 
function objectEquals(x, y) {
    // if both are function
    if (x instanceof Function) {
        if (y instanceof Function) {
            return x.toString() === y.toString();
        }
        return false;
    }
    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }

    // if one of them is date, they must had equal valueOf
    if (x instanceof Date) { return false; }
    if (y instanceof Date) { return false; }

    // if they are not function or strictly equal, they both need to be Objects
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) ?
            p.every(function (i) { return objectEquals(x[i], y[i]); }) : false;
}

function axiosFunc(){
axios.get('https://newsapi.org/v2/everything?sources=nhl-news&apiKey=fad34baee5e84580a347aa0f0714a6ee')
	 .then((resp)=>(tester(resp.data)));
}

let test = setInterval(axiosFunc, 5000);
	 

router.route('/news').get(function(request, response) {
	if(boolNouveau){
	axios.get('https://newsapi.org/v2/everything?sources=nhl-news&apiKey=fad34baee5e84580a347aa0f0714a6ee')
			.then((resp)=>response.send(resp.data))
			console.log("chargment")
	} else {
		console.log("pas de chargement")
		//promiseAncien().then(response.send(ancien))
		response.send(ancien)
	}
	
})
router.route('/news/:id').get(function(request, response) {
	let id = request.params.id.substring(3,request.params.id.length);
	axios.get('https://newsapi.org/v2/everything?sources=nhl-news&apiKey=fad34baee5e84580a347aa0f0714a6ee')
			.then((resp)=>response.send(resp.data.articles[id]));
})

module.exports = router
