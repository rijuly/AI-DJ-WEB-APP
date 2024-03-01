song1="";
song2="";
scoreLeftWrist=0;
song1_status="";
song2_status="";

function preload()
{
    song1=loadSound("music1.mp3");
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.position(600, 250);

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
        image(video, 0, 0, 600, 500)
        song1_status=song1.isPlaying()
        fill("#FF0000");
        stroke("#FF0000");

        if(scoreLeftWrist>0.002)
        {
            circle(leftWristX, leftWristY, 20);
            song1.stop();
            if (song2_status==false)
            {
                song2.play();
                document.getElementById("song").innerHTML="play-Peter Pan song";
            }
        }
}

function play()
{
    song.play();
}

function gotPoses (results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " +leftWristX +"leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " +rightWristX +"rightWristY = "+rightWristY);
    }
}

function modelLoaded ()
{
    console.log('PoseNet Is Initialised')
}