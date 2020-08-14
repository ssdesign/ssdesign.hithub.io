var context;
var base_image;
var canvas;
var el;
var mouseStatus = "up";
var playerWidth = 50;
var playerHeight = 60;
var x,y,xp,yp, xdisp, ydisp;
var deltaX, deltaY;
canvas = document.getElementById('gameCanvas');
document.addEventListener("DOMContentLoaded", function(){
  canvas = document.getElementById('gameCanvas'),
  context = canvas.getContext('2d');
  //alert("I am init");
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

  //context.drawImage(this, 0, 0, this.width, this.height);
  el = document.getElementById("gameCanvas");
  el.addEventListener("touchstart", setDown, false);
  el.addEventListener("touchend", setUp, false);
  el.addEventListener("touchmove", touchHandler, false);

  el.addEventListener("mousedown", setDown, false);
  el.addEventListener("mouseup", setUp, false);
  el.addEventListener("mousemove", touchHandler, false);

}


function touchHandler(ev) {
  console.log("======"+xp);



  if(mouseStatus == "down"){
    console.log(xp);
    if(ev.mousemove) {

        //var deltaX = ev.touches[0].pageX - x;
        //  var deltaY = ev.touches[0].pageY - y;
        var deltaX = ev.clientX-xp;
        var deltaY = ev.clientY-yp;
        xdisp = xp+deltaX;
        ydisp = yp+deltaY;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(base_image, xdisp, ydisp);
        xp = xdisp;
        yp = ydisp
        ev.preventDefault();
}
    if(ev) {
      deltaX = ev.clientX-x;
      deltaY = ev.clientY-y;
      xdisp = deltaX+xp;
      ydisp = deltaY+yp;

      if(xp >= canvas.width-50 || xp <= 0 || yp >= canvas.height-50 || yp<=0 ){
        x=ev.clientX;
        y=ev.clientY;
        //xp=base_image.x;
        //yp=base_image.y;
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
}
}
function setDown(ev){
  mouseStatus = "down";
  if(ev){
  x = ev.clientX
  y = ev.clientY
  //xp = ev.clientY-x;
  //yp = ev.clientY-y;

}
  if(ev.mousedown){
    x = ev.touches[0].pageX;
    y = ev.touches[0].pageY;
    //xp = ev.clientY-x;
    //yp = ev.clientY-y;
  }

}

function setUp(ev){
  mouseStatus = "up";
  if(ev){
    xp = xdisp;
    yp = ydisp

  }
  if(ev.mousedown){
    xp = xdisp;
    yp = ydisp;
  }

}
