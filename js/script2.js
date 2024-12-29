var con = document.getElementById("Content")
var input = document.getElementById("Find") 
var btn_find = document.getElementById("btn-find")

const apiKey = "b610601f25b440ae9ff171405241612";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json?";
var lo ;

var lst_data = []


// get dates [[month, "2024-12-25", 25]]
function getDaysFromNow() {
  const today = new Date();
  const days = [];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  for (let i = 0; i < 3; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i); // Add i days

    const day = String(futureDate.getDate()).padStart(2, '0'); // Add leading zero
    const monthIndex = futureDate.getMonth(); // Month index
    const monthName = monthNames[monthIndex]; // Get month name
    const monthNumber = String(monthIndex + 1).padStart(2, '0'); // Month number with leading zero
    const year = futureDate.getFullYear();
    const num_Day = futureDate.getDate(); // Numerical day of the month (e.g., 29)

    const formattedDate = `${year}-${monthNumber}-${day}`; // Format as YYYY-MM-DD
    days.push([monthName, formattedDate, num_Day]); // Push as [month name, formatted date, numerical day]
  }

  return days;
}

console.log(getDaysFromNow());


var dates = getDaysFromNow()

// get country
async function get_country() {
  try {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Country: ${data.country}`); // Full country name
    return data.country;
  } catch (error) {
    console.error('Error fetching GeoJS data:', error);
    return null; // Return null if there is an error
  }
}

// get whether data
async function getWeatherData(date) {
  if (input.value == ""){
    lo = await get_country() ;
  }
  else{
    lo = input.value ;
  }

    var url = `${baseUrl}key=${apiKey}&q=${lo}&dt=${date}`;
    var response = await fetch(url);
    var data = await response.json();


    return data
     
}


// add data to list of object
async function add_data(){
    var day_info = {}
    lst_data = []

    for(var i = 0; i < dates.length; i++){
      var data = await getWeatherData(dates[i][1]) ;

      var name = data.location.name
      var first_day = get_day(data.location.localtime)
      var day = get_day(`${data.forecast.forecastday[0].date} 00:00`)
      var temp_c = data.current.temp_c
      var maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c
      var mintemp_c = data.forecast.forecastday[0].day.mintemp_c
      var icon_day1 = data.current.condition.icon
      var type1 = data.current.condition.text
      var icon = data.forecast.forecastday[0].day.condition.icon
      var type = data.forecast.forecastday[0].day.condition.text
  
      day_info = {
          "name": name ,
          "first_day": first_day ,
          "temp_c": temp_c ,
          "maxtemp_c": maxtemp_c ,
          "mintemp_c": mintemp_c ,
          "icon1": icon_day1 ,
          "type1": type1 ,
          "icon": icon ,
          "type": type ,
          "day": day 
       } ;
       
       lst_data.push(day_info)
    }

    console.log(data)    
    return  lst_data

}


// get day
function get_day(local_time){
    time = local_time
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(time);


    var day = daysOfWeek[date.getDay()]
    // console.log(day)
    return day
}



// display data
async function display_data(){
  var lst_data = await add_data();
  
  cartoona = `<div class="col-lg-4 card  p-0 card1 text-white">
              <div class="d-flex justify-content-between con1-head py-2 px-3 ">
                <div>${lst_data[0].first_day}</div>
                <div>${dates[0][2]} ${dates[0][0]}</div>
              </div>

              <div class="content1 px-3 py-5">
                <p class="text">${lst_data[0].name}</p>

                <div class="degree">
                  ${lst_data[0].temp_c}<sup>o</sup>C
                  <span><img src="https:${lst_data[0].icon1}" alt=""></span>
                </div>
  
                <small>${lst_data[0].type1}</small>
  
                <div class="images mt-3">
                  <img src="images/icon-umberella.png"  alt=""> <span class="me-2">20%</span>
                  <img src="images/icon-wind.png" alt="" > <span class="me-2">18k/h</span>
                  <img src="images/icon-compass.png" alt="" > <span class="me-2">East</span>
                </div>
              </div>
            </div>

            <div class="col-lg-4 card p-0 card2 text-white">
              <div class="d-flex justify-content-center con1-head py-2 px-3 ">
                <div>${lst_data[1].day}</div>
              </div>

              <div class="content1 h-100 px-3 py-5 d-flex justify-content-center ">
                
                <div class="inner-content d-flex flex-column align-items-center">
                  <span class="d-block fs-3 my-2"><img src="https:${lst_data[1].icon}" alt=""></span>

                  <div class="degree2 text-center my-2 mb-4">
                    <div class="d1 mb-1"> ${lst_data[1].maxtemp_c}<sup>o</sup>C </div> 
                    <div class="d2"> ${lst_data[1].mintemp_c}<sup>o</sup> </div>
                  </div>
  
                  <small>${lst_data[1].type}</small>
                </div>

              </div>
            </div>

            <div class="col-lg-4 card p-0 card3 text-white">
              <div class="d-flex justify-content-center con1-head py-2 px-3 ">
                <div>${lst_data[2].day}</div>
              </div>

              <div class="content1 h-100 px-3 py-5 d-flex justify-content-center ">
                
                <div class="inner-content d-flex flex-column align-items-center">
                  <span class="d-block fs-3 my-2"><img src="https:${lst_data[2].icon}" alt=""></span>

                  <div class="degree2 text-center my-2 mb-4">
                    <div class="d1 mb-1"> ${lst_data[2].maxtemp_c}<sup>o</sup>C </div> 
                    <div class="d2"> ${lst_data[2].mintemp_c}<sup>o</sup> </div>
                  </div>
  
                  <small>${lst_data[2].type}</small>
                </div>

              </div>
            </div>`

  con.innerHTML = cartoona ;        
}


display_data() ;

btn_find.addEventListener("click", function(){
    display_data() ;
}) ;


