var context;
var base_image;
var canvas;
var el;
var mouseStatus = "up";
var touchStatus = "up";
var playerWidth = 50;
var playerHeight = 60;
var x,y,xp,yp, xdisp, ydisp;
var deltaX, deltaY;

var startX = 0
var startY = 0
var distX = 0
var distY=0

canvas = document.getElementById('gameCanvas');
document.addEventListener("DOMContentLoaded", function(){
  canvas = document.getElementById('gameCanvas'),
  context = canvas.getContext('2d');
  //alert("I am init");
  context.drawImage(this, xp, yp);
context.font = "30px Arial";
context.fillText("001", 10, 50);
  loadCharacter();
});

/*function mouseEvent(e){
  var m = mouse;
    var bounds = canvas.getBoundingClientRect();
    m.x = e.clientX - bounds.left;
    m.y = e.clientY - bounds.top;
    if(e.type === "mousedown"){
        m.button = true;
    }else if(e.type === "mouseup"){
        m.button = false;
    }
    renderUpdate = true;

  }
*/

function loadCharacter(){
  //alert("I am loadChar");
  base_image = new Image(50, 60);
  base_image.onload = drawImageActualSize;
  base_image.src = 'img/player.png';
}

function drawImageActualSize() {
//alert("Drawing");
xp = 315;
yp = 300;
  context.drawImage(this, xp, yp);
context.font = "30px Arial";
context.fillText("001", 10, 50);
  //context.drawImage(this, 0, 0, this.width, this.height);
  el = document.getElementById("gameCanvas");
  el.addEventListener("touchstart", setTouchDown, false);
  el.addEventListener("touchend", setTouchUp, false);
  el.addEventListener("touchmove", touchHandler, false);

  el.addEventListener("mousedown", setDown, false);
  el.addEventListener("mouseup", setUp, false);
  el.addEventListener("mousemove", touchHandler, false);

}
function touchHandler(ev){
  if(mouseStatus == "down"){
    deltaX = ev.clientX-x;
    deltaY = ev.clientY-y;
    xdisp = deltaX+xp;
    ydisp = deltaY+yp;
    if(xp >= canvas.width-50 || xp <= 0 || yp >=canvas.height-50 || yp<=0 ){
      x=ev.clientX;
      y=ev.clientY;
    }
    else{
      xp = xdisp;
      yp = ydisp;
      x=ev.clientX;
      y=ev.clientY;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(base_image, xdisp, ydisp);
      ev.preventDefault();
    }
  }

  if(touchStatus == "down"){
    var touchobj = e.changedTouches[0]
    var distX = parseInt(touchobj.clientX) - startX
    var distY = parseInt(touchobj.clientY) - startY
    //if(xp >= canvas.width-50 || xp <= 0 || yp >=canvas.height-50 || yp<=0 ){
    //  x=ev.clientX;
    //  y=ev.clientY;
    //}
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(base_image, distX, distX);
    e.preventDefault()
  }
}
function setDown(ev){
  mouseStatus = "down";
  x = ev.clientX
  y = ev.clientY

}

function setUp(ev){
  mouseStatus = "up";
  xp = xdisp;
  yp = ydisp
}

function setTouchDown(e){
  touchStatus = "down";
  var touchobj = e.changedTouches[0] // reference first touch 
  startxX = parseInt(touchobj.clientX) // get x position of    
  startY = parseInt(touchobj.clientY)
  e.preventDefault()
}
function setTouchUp(e){
  touchStatus = "up";
  var touchobj = e.changedTouches[0] // reference first touch 
  startX = touchobj.clientX // get x position of    
  startY = touchobj.clientY
  e.preventDefault()
}
