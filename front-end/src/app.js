
import axios from 'axios';



 setTimeout( axios.get('http://localhost:8080/news')
	 .then((resp)=> afficherNews(resp.data)),5000);
	 
	 
	 
		
 function afficherNews(raw) {
	let affichage="<table><tr>"; 
	let date;
	let position=0;
	for(var i = 0; i< raw.articles.length; i++){
		date = new Date (raw.articles[i].publishedAt);
		date = formaDate(date);

  
  affichage += ` <td bgcolor="white" height="10%" width="10%" class="w3-hover-red" onclick="afficherNew(${i})">
  <div class="w3-card-4 " style=" padding-top: 4px;padding-right: 4px;padding-bottom: 4px;padding-left: 4px;"  >
	  <header class="w3-container w3-blue" style="height:40%">
		   <h5 align="center" >${date} <font color="grey"><b><a href="${raw.articles[i].url}">link </a></b></font>by : ${raw.articles[i].author}  </h5>
	  </header>
		
		<div   style="background-image: url(${raw.articles[i].urlToImage}); background-size:cover; height:300px;">
			<div id="conteneur">
				<div class="element" style="background-color:rgba(219, 222, 225, 0.5);align-self: flex-end;" >
					<font color="black" size="4" align="center"><b>${raw.articles[i].title}</b></font>
				</div>
			</div>
		</div> 

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
	axios.get(`http://localhost:8080/news/:id${i}`)
	 .then((resp)=> aff(resp.data))
};	

 function aff(raw){
	 let date = new Date (raw.publishedAt);
		date = formaDate(date);
			let affichage2=`<div class="w3-card-4" >
		  <header  class="w3-container w3-blue" align="center"><h1>${raw.title}</h1></header>
		</div>
		<table><tr><td height="40%" width="50%" bgcolor="#E6E6FA">
						<p align="center"><img align="middle" src="${raw.urlToImage}" height="80%" width="100%"></p>
					</td>
					<td bgcolor="#E6E6FA">
						<p> <font size="5">${raw.description}</font></p>
					</td>
				</tr>
				<tr><td colspan="2">
						<footer class="w3-container w3-blue" align="center">
							<h5>${date} <a href="${raw.url}">link </a>by : ${raw.author} </h5>
						</footer>
					</td>
				</tr>
		</table>
		<br><br><br>
		<div align="center">
			<button  style="width: 50%" class="w3-btn w3-ripple w3-red w3-btn w3-round-large" onclick="retourNew()"> retour aux news</button>
		</div> `;
		
		
		
		document.getElementById("testMessages").innerHTML =affichage2;
}

window.retourNew = function retourNew(){
	
	window.location.reload(true);
}