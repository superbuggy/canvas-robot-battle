class Arena {
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.sidebar = document.getElementById('sub');
    this.context = canvas.getContext('2d');
    this.canvas.width = 450;
    this.canvas.height = 450;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.timer = 0;
    this.timerId = setInterval(_=>{
      this.timer+=1;
      document.getElementById("timer").innerHTML= this.timer ;
    },125)
  }
}
var bob;
var GameArena;
window.onload = function(){
  GameArena = new Arena();
  bob = new RobotUi();
  window.addEventListener("click", _=>{
    bob.fire(222)
  });
  window.addEventListener("keydown", function(evt){
    console.log(evt.code);
    if (evt.code == "KeyW"){
      bob.move(270)
    } else if (evt.code == "KeyS"){
      bob.move(90)
    } else if (evt.code == "KeyA"){
      bob.move(180)
    } else if (evt.code == "KeyD"){
      bob.move(0)
    }
  })
  GameArena.canvas.addEventListener("mousemove", function(evt){
    let xDiff = evt.layerX - bob.xPos;
    let yDiff = evt.layerY - bob.yPos;
    let dist = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) )
    let degs = Math.round( radiansToDegrees(Math.atan2(yDiff, xDiff)) );
    degs < 0 ? degs+=360 : "";
    dist = Math.round(dist)
    GameArena.sidebar.innerHTML = `X: ${evt.layerX} <br>  Y: ${evt.layerY} <br> xDiff: ${xDiff} <br> yDiff: ${yDiff} <br> Distance: ${dist} <br> ${degs}°`;
    bob.aim(degs)
  })
}
