previsao1="";
previsao2="";
Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90,
})
camera=document.getElementById("camera");
Webcam.attach("#camera");
function tirarfoto(){
 Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="' + data_uri + '"/>';
 })   
}
console.log("versão do ml5:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelocarregado");
}
function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "a primeira previsão é "+previsao1;
    speakData2 = "a segunda previsão é "+previsao2;
    var utterThis = new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        previsao1 = results[0].label;
        previsao2 = results[1].label;
        speak();
        if(results[0].label=="feliz"){
            document.getElementById("updateEmoji").innerHTML="&#128522;";
        }
        if(results[0].label=="triste"){
            document.getElementById("updateEmoji").innerHTML="&#128532;";
        }
        if(results[0].label=="irritado"){
            document.getElementById("updateEmoji").innerHTML="&#128548;";
        }   
        if(results[1].label=="feliz"){
            document.getElementById("updateEmoji").innerHTML="&#128522;";
        }
        if(results[1].label=="triste"){
            document.getElementById("updateEmoji").innerHTML="&#128532;";
        }
        if(results[1].label=="irritado"){
            document.getElementById("updateEmoji").innerHTML="&#128548;";
        }   
    }
}

