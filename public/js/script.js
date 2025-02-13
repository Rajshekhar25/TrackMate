const socket = io();

if(navigator.geolocation){   /*checking if browser supports geolocation, navigator is pre built in the browser*/
        navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} =position.coords;
        socket.emit("send-location", {latitude,longitude});
        },

        (error)=>{
            console.log(error);
        },
        {
          enableHighAccuracy:true,
          timeout:5000,
          maximumAge:0
            
        }
    );
}    

const map = L.map("map").setView([0,0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{

    attribution:"OpenStreetMap"
}).addTo(map)

const markers={};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    // If marker does not exist, create one
    if (!markers[id]) {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    } else {
        // Move existing marker
        markers[id].setLatLng([latitude, longitude]);
    }

    // Ensure the map centers on YOUR location
    if (id === socket.id) {
        map.setView([latitude, longitude], 16);
    }
});

socket.on("user-disconnect",(id)=>{
          
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})