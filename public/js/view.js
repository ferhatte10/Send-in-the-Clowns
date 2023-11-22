let socket = io('ws://localhost:8001');

// draw the image in the canvas
let canvas = document.getElementById("preview");
let context = canvas.getContext('2d');

const print = function(text){
    context.fillStyle = '#333';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = '#fff';
    context.font = '50px Arial';
    context.textAlign = 'center';
    context.fillText(`${text}...`,canvas.width/2,canvas.height/2);
}

print("Waiting for stream");


socket.on('streamoff',function(reason){
    print("Stream stopped");
    //wait for 2 seconds
    setTimeout(function(){
        print("Waiting for stream");
    },2000);
});

socket.on('stream',function(data){
    let img = new Image();
    img.src = data.img;

    // once the image has loaded, draw the image
    img.onload = function() {
        // fit the image to the canvas
        let hRatio = canvas.width / img.width;
        let vRatio = canvas.height / img.height;
        let ratio = Math.min(hRatio, vRatio);
        let centerShift_x = (canvas.width - img.width * ratio) / 2;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image
        context.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, 0, img.width * ratio, img.height * ratio);

        // Process and draw pose keypoints
        if (data.pos && data.pos.length > 0) {
            for (let j = 0; j < data.pos.length; j++) {
                const keypoints = data.pos[j].pose.keypoints;
                for (let i = 0; i < keypoints.length; i++) {
                    const keypoint = keypoints[i];
                    if (keypoint.score > 0.2) {
                        // Draw red dots representing pose keypoints
                        const x = keypoint.position.x * ratio + centerShift_x;
                        const y = keypoint.position.y * ratio;
                        context.fillStyle = 'red';
                        context.beginPath();
                        context.arc(x, y, 5, 0, Math.PI * 2);
                        context.fill();
                    }
                }
            }
        }
    };
});