var issIcon = L.icon({
  iconUrl: 'data/iss.png',
  iconSize: [32.8480, 20]
});

var map = L.map('mapid');

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

map.fitWorld().zoomIn();

var issMarker = L.marker([0, 0], {icon: issIcon}).addTo(map);

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function () {
  var json = JSON.parse(this.responseText);

  var lat = json.iss_position.latitude;
  var lng = json.iss_position.longitude;
  var newLatLng = new L.LatLng(lat, lng);
  issMarker.setLatLng(newLatLng);

  var line = new L.Polyline([newLatLng, newLatLng], {
    color: 'red',
    weight: 3,
    smoothFactor: 1
  }).addTo(map);
  map.addLayer(line);
});

setInterval(function () {
  oReq.open("GET", "http://api.open-notify.org/iss-now.json");
  oReq.send();
}, 1000);