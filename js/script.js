// const apiKey = "b610601f25b440ae9ff171405241612";
// var baseUrl = "https://api.weatherapi.com/v1/forecast.json?";
// const location = "cairo";
// const dates = ["2024-12-26", "2024-12-27", "2024-12-28"];



// async function getWeatherData(date) {
//       const url = `${baseUrl}key=${apiKey}&q=${location}&dt=${date}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       console.log(data)

  

//   }

// getWeatherData(dates[0])


// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else { 
//       console.log("Geolocation is not supported by this browser.")
//     }
//   }


//   function showPosition(position) {
//     console.log(`Latitude:  ${position.coords.latitude}  
//     Longitude:  ${position.coords.longitude} `)
//   }

//   getLocation()

// async function get_info(getLocation){
//     var data = await fetch("http://api.weatherapi.com/v1/current.json?key=b610601f25b440ae9ff171405241612&q=lon");
//     var respone = await data.json()

//     console.log(respone)
// }

// get_info()


// ////////////////

// function get_day(local_time){
//     time = local_time
//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const date = new Date(time);


//     var day = daysOfWeek[date.getDay()]

//     console.log(day)
// }

// get_day("2024-12-24 16:46")

/////////////


// function get_country(){
//     fetch('https://get.geojs.io/v1/ip/geo.json')
//     .then(response => response.json())
//     .then(data => {
//       console.log(`Country: ${data.country}`); // Full country name
//       return data.country 
//     })
//     .catch(error => console.error('Error fetching GeoJS data:', error));
  
// }

// get_country()


// function getDaysFromNow() {
//     const today = new Date();
//     const days = [];
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
  
//     for (let i = 0; i < 3; i++) {
//       const futureDate = new Date(today);
//       futureDate.setDate(today.getDate() + i); // Add i days
  
//       const day = String(futureDate.getDate()).padStart(2, '0'); // Add leading zero
//       const monthIndex = futureDate.getMonth(); // Month index
//       const monthName = monthNames[monthIndex]; // Get month name
//       const monthNumber = String(monthIndex + 1).padStart(2, '0'); // Month number with leading zero
//       const year = futureDate.getFullYear();
  
//       const formattedDate = `${year}-${monthNumber}-${day}`; // Reverse format to YYYY-MM-DD
//       days.push([monthName, formattedDate]); // Push as [month name, formatted date]
//     }
  
//     return days;
//   }
  
//   // Print the list of days
//   const days = getDaysFromNow();
//   console.log("Days from now to 3 days after:");
//   console.log(days);
  

  

//   getDaysFromNow()