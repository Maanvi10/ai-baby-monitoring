img = "";
stat = "";
song="";
function preload(){

   song = loadSound("alarm.mp3");

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Checking For Person 🔍";
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}

function modelLoaded() {
    console.log("Model Loaded!")
    stat = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    stuff = results;
}


function draw() {

    image(video, 0, 0, 380, 380);

    if (stat != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < stuff.length; i++) {
            objectDetector.detect(video, gotResult);
            document.getElementById("status").innerHTML = "Status : Person Detected 📸";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected : " + stuff.length;

            fill(r, g, b);
            percent = floor(stuff[i].confidence * 100);
            text(stuff[i].label + " " + percent + "%", stuff[i].x, stuff[i].y);
            noFill();
            stroke(r, g, b);
            rect(stuff[i].x, stuff[i].y, stuff[i].width, stuff[i].height);

            if (stuff[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            } else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }
    }
}