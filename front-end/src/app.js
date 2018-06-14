
import axios from 'axios';



 setTimeout(  axios.get('http://localhost:8080/news')
	 .then((resp)=> afficherNews(resp.data)),5000);
	 
	 
	 
		
 function afficherNews(raw) {
	let affichage="<table><tr>"; 
	let date;
	let position=0;
	for(var i = 0; i< raw.articles.length; i++){
		date = new Date (raw.articles[i].publishedAt);
		date = formaDate(date);
		affichage+=	`<td height="10%" width="5%" ><div class="w3-container w3-red" >
		  <h1>${raw.articles[i].title}</h1>
		</div>

		<p ><img  src="${raw.articles[i].urlToImage}" height="100%" width="100%"></p>

		<div class="w3-container">
		  <p>${raw.articles[i].description}</p>
		</div>

		<div class="w3-container w3-green">
		  <h5>${date} <a href="${raw.articles[i].url}">link </a>by : ${raw.articles[i].author}  <button class="w3-button w3-ripple w3-yellow" onclick="afficherNew(${i})"> Voir en detail</button></h5>
		</div></td>`;
		if(position==2){
			position=0;
			affichage+="</tr><tr>";
		 } else {
			 position++;
		 }
	} 
	affichage+='</tr></table>';
	document.getElementById("testMessages").innerHTML =affichage;
 };
			
			
function formaDate(date){
	let date2;
	date2 = date.getDay()+"/"+ date.getMonth()+"/"+ date.getFullYear()+" "+date.getHours()+":"+ date.getMinutes()+":"+ date.getSeconds();
	return date2;
}

window.afficherNew = function afficherNew(i){
	// alert(i);
	axios.get(`http://localhost:8080/news/:id${i}`)
	 .then((resp)=> aff(resp.data))
};	

 function aff(raw){
	 let date = new Date (raw.publishedAt);
		date = formaDate(date);
	let affichage2=`<h1 align="center">${raw.source.name}</h1><div class="w3-container w3-red" >
		  <h1>${raw.title}</h1>
		</div>

		<p align="center"><img align="middle" src="${raw.urlToImage}" height="60%" width="60%"></p>

		<div class="w3-container">
		  <p>${raw.description}</p>
		</div>

		<div class="w3-container w3-green">
		  <h5>${date} <a href="${raw.url}">link </a>by : ${raw.author} </h5>
		</div><br><button style="width: 100%" class="w3-button w3-ripple w3-yellow" onclick="retourNew()"> retour aux news</button><br><br> `;
		
		document.getElementById("testMessages").innerHTML =affichage2;
}

window.retourNew = function retourNew(){
	
	window.location.reload(true);
}