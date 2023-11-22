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

document.addEventListener('DOMContentLoaded', function() {

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia );

    if(navigator.getUserMedia)
    {
        navigator.getUserMedia({
            video: true,
            audio: false
        },loadCamera,loadFail);
    }

    const poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", gotPoses);

    function modelReady() {
        console.log("Model ready!");
        poseNet.singlePose(video);
    }

    function gotPoses(poses) {
        socket.emit('stream', {img : canvas.toDataURL('image/webp'),pos : poses});
    }

    setInterval(function(){
        Draw(video,context);
    },33);


});