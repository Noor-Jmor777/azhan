let iraqiCities = [
  "Baghdad", "Mosul", "Basra", "Erbil", "Kirkuk", "Najaf", "Karbala", "Sulaymaniyah", "Hilla", "Fallujah", "Ramadi", "Nasiriyah", "Kut", "Diwaniyah", "Amara", "Samawah", "Balad", "Tikrit", "Sinjar", "Haditha", "Ba'qubah", "Khalis", "Kufa", "Samarra", "Taji", "Al-Kut", "Hīt", "Rawa", "Al-Qa'im", "Al-Qurnah"
];

let syrianCities = [
  "Damascus", "Aleppo", "Homs", "Hama", "Latakia", "Raqqa", "Deir ez-Zor", "Daraa", "Idlib", "Al-Hasakah", "Qamishli", "Tartus", "As-Suwayda", "Manbij", "Al-Bab", "Jarabulus", "Azaz", "Al-Mayadin", "Salamiyah", "Yarmouk", "Al-Bukamal", "Maarrat al-Nu'man"
];

let turkeyCities = [
  "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"
];

let uaeCities = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"
];

let yemenCities = [
  "Sana'a", "Aden", "Taiz", "Al Hudaydah", "Ibb"
];

let jordanCities = [
  "Amman", "Zarqa", "Irbid", "Aqaba", "Madaba"
];

let kuwaitCities = [
  "Kuwait City", "Salmiya", "Hawalli", "Farwaniya", "Al Ahmadi"
];

let lebanonCities = [
  "Beirut", "Tripoli", "Sidon", "Tyre", "Byblos"
];

let omanCities = [
  "Muscat", "Salalah", "Sohar", "Nizwa", "Sur"
];

let palestineCities = [
  "Quds", "Gaza City", "Hebron", "Nablus", "Ramallah"
];

let qatarCities = [
  "Doha", "Al Wakrah", "Al Khor", "Al Rayyan", "Umm Salal Mohammed"
];

let saudiArabiaCities = [
  "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"
];

let afghanCities = [
  "Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad"
];

let bahrainCities = [
  "Manama", "Riffa", "Muharraq", "Hamad Town", "Isa Town"
];

let cyprusCities = [
  "Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos"
];

let egyptCities = [
  "Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said"
];

let iranCities = [
  "Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz"
];

const countries = {
  "Afghanistan": afghanCities,
  "Bahrain": bahrainCities,
  "Cyprus": cyprusCities,
  "Egypt": egyptCities,
  "Iran": iranCities,
  "Iraq": iraqiCities,
  "Jordan": jordanCities,
  "Kuwait": kuwaitCities,
  "Lebanon": lebanonCities,
  "Oman": omanCities,
  "Palestine": palestineCities,
  "Qatar": qatarCities,
  "Saudi Arabia": saudiArabiaCities,
  "Syria": syrianCities,
  "Turkey": turkeyCities,
  "UAE": uaeCities,
  "Yemen": yemenCities
};

const countrySelect = document.getElementById("countrySelect");
const citySelect = document.getElementById("citySelect");

//load countries in the input options
console.log(Object.keys(countries));
Object.keys(countries).forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

// load cities in the input options
function loadCities()
{
  citySelect.innerHTML ="";
  let cities = [];
  
  cities = countries[countrySelect.value] || [];

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
  LoadTimes(citySelect.value,countrySelect.value); // by default

  citySelect.addEventListener("change", function() {
    //const itsCountry = cities.find(city => city.name === citySelect.value).country;
    LoadTimes(citySelect.value,countrySelect.value);
  });
}
loadCities();
countrySelect.addEventListener("change",loadCities)

function LoadTimes(city,country) {
  let params = 
  {
    city : city,
    country : country
  };
  axios.get('http://api.aladhan.com/v1/timingsByCity',{params:params})
  .then(data => {
    const showTimes = document.getElementById("showTimes");
    const showCity =  document.getElementById("showCity")
    showTimes.innerHTML = '';
    showCity.innerHTML = '';
    const dateShow = data.data.data.date.gregorian.date;
    const dayShow = data.data.data.date.gregorian.weekday.en;

    showCity.innerHTML += `<h3>${country}/${city}</h3>`;
    showCity.innerHTML += `<h5>${dateShow}</h5>`;
    showCity.innerHTML += `<h6>${dayShow}</h6>`;

    const timings = data.data.data.timings;
    const timingsEntries = Object.entries(timings).slice(0, 7);
    timingsEntries.forEach(([key, value]) => {

      const timeElement = document.createElement("div");
      timeElement.classList.add("timeElement","bg-warning","bg-opacity-25","rounded-3","overflow-hidden","mb-2");
      const keyTime = document.createElement("h4");
      keyTime.classList.add("p-2","w-100","bg-black","text-white")
      const ValueTime = document.createElement("h4");
      ValueTime.classList.add("p-2","w-100","fw-bold")

      keyTime.textContent = `${key}`;
      ValueTime.textContent = `${value}`;
      
      timeElement.appendChild(keyTime);
      timeElement.appendChild(ValueTime);
      showTimes.appendChild(timeElement);
    });
  })
    .catch(error => {
      console.error('Error fetching data:', error);
    }
  );
}

