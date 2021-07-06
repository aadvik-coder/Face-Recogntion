camera = document.getElementById("camera");
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hDjt-J-2Q/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) { // Display error in the console 
    if (error) {
        console.error(error);
    } else { // The results are in an array ordered by confidence. 
        console.log(results);
        confidence = results[0].confidence.toFixed(1) * 100;
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_acc").innerHTML = confidence + "%";
    }
}