status = "";
objects = [];

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}



function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting" ;
    input= document.getElementById("name_input").value;
}

function modelLoaded()
{
    console.log("Model Loaded!!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}
function draw()
{
    image(video, 0, 0, 400, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected ";
            objectDetector.detect(gotResult);
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].length);


            if(objects[i].label == input)
            {  video.stop();
                objectDetector.detect(gotResult);
              document.getElementById("number_of_objects").innerHTML = input + " Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(input + "Found");
              synth.speak(utterThis);
            }
            else
            {  
              
              document.getElementById("number_of_objects").innerHTML = input + " Not Found";
            }          
           }
        }
        
    }
