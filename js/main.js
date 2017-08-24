var issIcon = L.icon({
  iconUrl: 'data/iss.png',
  iconSize: [32.8480, 20]
});

var map = L.map('mapid');

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo(map);

map.fitWorld().zoomIn();

var issMarker = L.marker([0, 0], {icon: issIcon}).addTo(map);

setInterval(function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function () {
    var json = JSON.parse(this.responseText);

    var lat = json.iss_position.latitude;
    var lng = json.iss_position.longitude;
    var newLatLng = new L.LatLng(lat, lng);
    issMarker.setLatLng(newLatLng);
  });
  oReq.open("GET", "http://api.open-notify.org/iss-now.json");
  oReq.send();
}, 1000);