var mymap = L.map('map').setView([41.81702, 12.48908], 17);

var marker = L.marker([41.81702, 12.48908]).addTo(mymap);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZmVkZWxtb250ZSIsImEiOiJjampiOHZkemIyMXF1M2xwZWJsYWU5NW5vIn0.YXBaMXayaNj5ijF9k-Sqjg'
}).addTo(mymap);
