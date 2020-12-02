let playing = false;
let video;
let song;
let button;
let size = [];
let coordinateX = [];
let coordinateY = [];
let slider;
let tempX = 24;
let tempY = 12;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyelX2 = 0;
let eyelY2 = 0;


let vScale = 9;

function preload(){
  video = createCapture(VIDEO);
  // song = loadSound('tvStatic.mp3')
}

function setup() {
  createCanvas(1920, 1440);
  pixelDensity(1);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  // slider = createSlider(.75, 5.5, 0,0);
  // button = createButton('play');
  // button.mousePressed(toggleVidSound);
  // video.hide();
  noStroke();
  fill(0);
  //scaling the actual video down
  video.size(width / vScale, height / vScale);
}
// function toggleVidSound() {
//   if (playing) {
//     video.pause();
//     song.pause();
//     button.html('play');
//   } else {
//     video.loop();
//     song.loop();
//     button.html('pause');
//   }
//   playing = !playing;
// }
function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    let eX2 = poses[0].pose.keypoints[2].position.x;
    let eY2 = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
    eyelX2 = lerp(eyelX2, eX2, 0.5);
    eyelY2 = lerp(eyelY2, eY2, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}
function draw() {
  background('black');
  video.loadPixels();
  push();
  locationUno();
  pop();
  push();
  // translate(640,0);
  locationDos();
  pop();
  push();
  // translate(1280,0);
  locationTres();
  pop();

  sidetoside();
  let d = dist(noseX, noseY, eyelX, eyelY);
  let d2 = dist(noseX, noseY, eyelX2, eyelY2);
  let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
  // fill(255, 0, 0);
  // ellipse(eyelX, eyelY, d/2);
  // ellipse(eyelX2, eyelY2, d2/2);
  // line(eyelX, eyelY, eyelX2, eyelY2)
  //fill(0,0,255);
  //ellipse(eyelX, eyelY, 50);
  // console.log(length)
    if (length < 25){
      fill(255)
    }
    if (length>25){
    fill(255,0,0)
    }

  // for (var y = 0; y < video.height; y++) {
  //   size[y] = [];
  //   coordinateX[y] = [];
  //   coordinateY[y] = [];
  //   for (var x = 0; x < 70; x++) {
  //     var index = (video.width + x + 1 + (y * video.width)) * 4;
  //     var r = video.pixels[index + 0];
  //     var g = video.pixels[index + 1];
  //     var b = video.pixels[index + 2];
  //     //finding the brightness of the pixels from the video
  //     var bright = (r + g + b) / 3;
  //     var w = map(bright, 0, 255, 0, vScale);
  //     size[y][x] = w;
  //     coordinateX[y][x] = (x * vScale)+10;
  //     coordinateY[y][x] = (y * vScale)+10;
  //     noStroke();
  //     fill('white');
  //     rectMode(CENTER);
  //     //scaling the rectangle to the canvas size
  //     rect(((x * vScale)+10), ((y * vScale)+10), w, w);
  //   }
  // }
  // //finding the pixel location on the screen for
  // var tempX = 24;
  // var tempY = 12;
  //  // fill('red');
  // // rect(coordinateX[tempX][tempY], coordinateY[tempX][tempY], size[tempX][tempY], size[tempX][tempY]);
  // if (mouseIsPressed) {
  //   fill('red');
  //   rect(mouseX, mouseY, (size[tempX][tempY])*2,(size[tempX][tempY])*2 )
  //   let valueOfMouse = (size[tempX][tempY]);
  //   slider.value(valueOfMouse);
  //   let sizeLoud = map(valueOfMouse, .75, 5.5, 0, 2);
  //   song.setVolume(sizeLoud);
  //   console.log(song.setVolume());
  // }
}
function locationUno(){
  for (var y = 0; y < video.height; y++) {
    size[y] = [];
    coordinateX[y] = [];
    coordinateY[y] = [];
    for (var x = 0; x < 70; x++) {
      var index = (video.width + x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      size[y][x] = w;
      coordinateX[y][x] = (x * vScale)+10;
      coordinateY[y][x] = (y * vScale)+10;
      noStroke();
      // fill('red');
      // if (length < 25){
      //   fill('red')
      // }
      // if (length>25){
      // fill('white')
      // }
      // console.log(length)
      rectMode(CENTER);
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
}
function locationDos(){
  for (var y = 0; y < video.height; y++) {
    size[y] = [];
    coordinateX[y] = [];
    coordinateY[y] = [];
    for (var x = 71 ; x < 141; x++) {
      var index = (video.width + x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      size[y][x] = w;
      coordinateX[y][x] = (x * vScale)+10;
      coordinateY[y][x] = (y * vScale)+10;
      noStroke();
      // fill('green');
      rectMode(CENTER);
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
}

function locationTres(){
  for (var y = 0; y < video.height; y++) {
    size[y] = [];
    coordinateX[y] = [];
    coordinateY[y] = [];
    for (var x = 142; x < 250; x++) {
      var index = (video.width + x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      //finding the brightness of the pixels from the video
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, 0, vScale);
      size[y][x] = w;
      coordinateX[y][x] = (x * vScale)+10;
      coordinateY[y][x] = (y * vScale)+10;
      noStroke();
      // fill('blue');
      rectMode(CENTER);
      //scaling the rectangle to the canvas size
      rect(((x * vScale)+10), ((y * vScale)+10), w, w);
    }
  }
}

function sidetoside(){
  // line(0, height/2, eyelX2, eyelY2);
let d = dist(noseX, noseY, eyelX, eyelY);
let d2 = dist(noseX, noseY, eyelX2, eyelY2);
let length = int(dist(eyelX, eyelY, eyelX2, eyelY2));
strokeWeight(4);
line(width, height/2, eyelX, eyelY);
let leftD = int(dist(width, height / 2, eyelX2, eyelY2))
// ellipse(0, height/2 ,25);
// ellipse(width, height / 2, 25)

if (leftD > 427) {
  fill('green');
}
if (leftD < 213) {
  fill('blue');
}
}
