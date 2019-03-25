window.addEventListener('load', () => {
let long; 
let lat; 
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector("temperature");
const temperatureSpan = document.querySelector('temperature span');

if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(position => { 
    long = position.coords.longitude;
    lat = position.coords.latitude;
    //This API enables cross-origin requests to anywhere.
    
    const api =`https://api.darksky.net/forecast/e39f589993bc108e1cdcb03fad49ac7f/${lat},${long}`;
    
    
    fetch(api) 
    .then(response => { 
        return response.json();
    }) 
   .then(data => { 
       const { temperature,summary,icon } = data.currently;
       //set DOM elements from the API 
       temperatureDegree.textContent = temperature;
       temperatureDescription.textContent = summary;
       locationTimezone.textContent = data.timezone;
       // set icon 
       setIcons(icon, document.querySelector(".icon"));

       // Change temperature to Celsius/Farenheit

        temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F") { 
                temperatureSpan.textContent = "C";
            } else { 
                temperatureSpan.textContent = "F";
            }
        });
 });
});
}


function setIcons(icon, iconID) { 
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUppperCse();
    skycons.play()
    return skycons.set(iconID,Skycons,[currentIcon]);
}
});