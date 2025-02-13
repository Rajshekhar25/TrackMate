const socket = io();

if(navigator.geolocation){   /*checking if browser supports geolocation, navigator is pre built in the browser*/
        navigator.geolocation.watchPosition((position)=>{
        const {latitiute, longitude} =position.coords;
        socket.emit("send-location", {latitude,longitude});
        },

        (error)=>{
            console.log(error);
        },
        {
          enableHighAccuracy:true,
          timeout:5000
          maximumAge:0,
            
        }
    );
}    

L.map("map");
