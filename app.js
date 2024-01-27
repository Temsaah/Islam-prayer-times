let title = document.getElementsByTagName("h1")[0];
let preLoader = document.getElementsByClassName("preloader")[0];
let select = document.getElementById("select");

hideAnimation();
getPrayerTime();
select.onchange = function () {
  getPrayerTime();
};

function getPrayerTime() {
  let athanAPI = `https://api.aladhan.com/v1/timingsByCity?city=${select.value}&country=EG&method=5`;
  fetch(athanAPI)
    .then((response) => response.json())
    .then((items) => {
      let salah = items.data.timings;
      title.innerHTML = `${items.data.date.hijri.weekday.ar} ${
        Number(items.data.date.hijri.day) + 1
      } ${items.data.date.hijri.month.ar} `;
      getTime("Fajr", salah.Fajr);
      getTime("Dhuhr", salah.Dhuhr);
      getTime("Asr", salah.Asr);
      getTime("Maghrib", salah.Maghrib);
      getTime("Isha", salah.Isha);
    });
}

function hideAnimation() {
  setTimeout(function () {
    preLoader.style.opacity = "0";
  }, 1000);
  setTimeout(function () {
    preLoader.style.display = "none";
  }, 1500);
}

function getTime(id, time) {
  document.getElementById(`${id}`).getElementsByTagName("span")[0].innerHTML =
    time;
}
