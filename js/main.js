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

var oldLatLng = null

var issnowReq = new XMLHttpRequest();
issnowReq.addEventListener("load", function () {
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
  oldLatLng = newLatLng;
});

jsonp("http://api.open-notify.org/iss-pass.json?lat="+"43.6108"+"&lon="+"3.8767", function(data) {
  var d = new Date(1503661970*1000)
  console.log(d.getDate(), d.getMonth(), d.getFullYear());
});

function jsonp(url, callback) {
  var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
}

setInterval(function () {
  issnowReq.open("GET", "http://api.open-notify.org/iss-now.json");
  issnowReq.send();
}, 1000);