/*global  APIKEY*/
/*global navigator*/

var loc;
var temp;
var tempC;
var tempF;
var humidity;
var visibility;
var pressure;
var wind;
var desc;
var icon;
var lat;
var lon;


window.onload = function() {
	//var x = document.getElementById("demo");
	if (navigator.geolocation) {
		 navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			lon = position.coords.longitude;
		console.log(lat);
		console.log(lon);
			getWeatherByGeo(lat,lon);
		});
	} else {
		//x.innerHTML = "Geolocation is not supported by this browser.";
		 var zip = prompt("Geolocation is not supported by this browser, please enter your zip");
		getWeatherByZip(zip);
	}
};

function getWeatherByGeo(lat,lon) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			//console.log(response);
			//console.log(url);
			//console.log(response.name);
			loc = response.name;
			temp = response.main.temp;
			tempF = Math.floor(temp) + " &#8457;";
			tempC = Math.floor((temp - 32)/1.8) + " &#8451;";
			humidity = response.main.humidity;
			visibility = response.visibility;
			pressure = response.main.pressure;
			wind = response.wind.speed;
			desc = response.weather[0].description;
			icon = response.weather[0].icon;
			//console.log(response.weather[0].description);
			//console.log(response.weather[0].icon);
			dispWeatherDetails();
		}
	};	
		
	var url = "https://api.openweathermap.org/data/2.5/weather?"
				+ "lat="+lat
				+ "&lon=" +lon
				+ "&units=imperial"
				+ "&apikey="+APIKEY;
	xhttp.open("GET", url, true);
	xhttp.send();
}



function getWeatherByZip() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			//console.log(response);
			//console.log(response.name);
			loc = response.name;
			temp = response.main.temp;
			tempF = Math.floor(temp) + " &#8457;";
			tempC = Math.floor((temp - 32)/1.8) + " &#8451;";
			humidity = response.main.humidity;
			visibility = response.visibility;
			pressure = response.main.pressure;
			wind = response.wind.speed;
			desc = response.weather[0].description;
			icon = response.weather[0].icon;
			dispWeatherDetails();
			}
	};
	var zip = document.getElementById("zip").value;
	var url = "https://api.openweathermap.org/data/2.5/weather?"
				+ "zip="+zip+",us"
				+ "&apikey="+APIKEY;
	xhttp.open("GET", url, true);
	xhttp.send();
	console.log(url);
}

function dispWeatherDetails() {
	var currdate = new Date();
	document.getElementById("date").innerHTML = currdate.toString().substr(0,25) ;
	document.getElementById("loc").innerHTML = loc ;
	document.getElementById("temp").innerHTML = tempF;
	document.getElementById("humidity").innerHTML = humidity;
	document.getElementById("visibility").innerHTML = visibility;
	document.getElementById("pressure").innerHTML = pressure;
	document.getElementById("wind").innerHTML = wind + " mph";
	document.getElementById("icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
	document.getElementById("desc").innerHTML = desc;
}
	
function switchCF() {
	console.log(tempF);
	var hButton = document.getElementById("switch");
	var currDisp = hButton.value;
	console.log(currDisp);
	var hTemp = document.getElementById("temp");
	
	if (currDisp == "F") {
		hTemp.innerHTML = tempC;
		hButton.innerHTML = "Switch to &#8457;";
		hButton.value = "C";
	}
	else {
		hTemp.innerHTML = tempF;
		hButton.innerHTML = "Switch to &#8451;";
		hButton.value = "F";
    }	
}		
