let canvas = document.getElementById("preview");
let context = canvas.getContext('2d');

context.width = canvas.width;
context.height = canvas.height;

let video = document.getElementById("video");

let socket = io('ws://localhost:8001');


function logger(msg){
    document.getElementById("log").innerHTML = msg;
}

function loadCamera(stream){
    try {
        video.srcObject = stream;
    }

    catch (error) {
        video.src = URL.createObjectURL(stream);
    }

    logger("Camera connected");
}

function loadFail(){
    logger("Camera not connected");
}

function Draw(video,context){
    context.drawImage(video,0,0,context.width,context.height);
}

document.addEventListener('DOMContentLoaded', function() { // DOM ready

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia ); // Cross browser support

    if(navigator.getUserMedia) // Access the camera stream
    {
        navigator.getUserMedia({
            video: true,
            audio: false
        },loadCamera,loadFail);
    }

    const poseNet = ml5.poseNet(video, modelReady); // Load the PoseNet model
    poseNet.on("pose", gotPoses); // Listen to new 'pose' events

    function modelReady() {
        console.log("Model ready!");
        poseNet.singlePose(video);
    }

    function gotPoses(poses) {
        socket.emit('stream', {img : canvas.toDataURL('image/webp'),pos : poses});
    }

    setInterval(function(){ // Loop and redraw the canvas every 22ms
        Draw(video,context);
    },22);


});