//https://teachablemachine.withgoogle.com/models/jKQSjExvY/model.json
prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
    });
    
    camera= document.getElementById("camera");
    
    Webcam.attach("#camera");
    
    function take_snapshot(){
         
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri+'"/>';
    
        });
    }
    
    console.log("ml5 version" , ml5.version);
    
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jKQSjExvY/model.json",modelLoaded);

    function modelLoaded(){
        console.log("Model Loaded!");
    } 
    function speak(){
        var synth= window.speechSynthesis;
        speak_data = "The Prediction is " + prediction;
        var UtterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(UtterThis);
    }
    
    function check(){
        img=document.getElementById("captured_image");
        classifier.classify(img,gotresults);
    }
    
    function gotresults(error,results){
        if (error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("name1").innerHTML=results[0].label;
            prediction= results[0].label;
            speak();
            
            if(results[0].label=="Victory"){
                document.getElementById("emoji1").innerHTML="&#9996;";
            }
            if(results[0].label=="Amazing"){
                document.getElementById("emoji1").innerHTML="&#128076;";
            }
            
            if(results[0].label=="Best"){
                document.getElementById("emoji1").innerHTML="&#128077;";
            }
        }
    }