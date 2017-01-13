class RobotUi extends Robot {
  constructor(){
    super();
    this.radius = 15;
    this.gunLength = 20;
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.motionTimer = null;
    this.render();
  }

  pre(){
    this.gunRads = this.gunDegs * (Math.PI/180);
    this.gunRads = Math.round(this.gunRads * 1000) / 1000
    this.turretEndX = Math.round(this.xPos + Math.cos(this.gunRads) * this.gunLength);
    this.turretEndY = Math.round(this.yPos + Math.sin(this.gunRads) * this.gunLength);
  }

  move(heading){
    if (this.motionTimer){
      clearInterval(this.motionTimer)
      console.log(heading, this.heading);
      if (heading == this.heading){
        this.speed+=8;
        console.log(this.speed);
      } else {
        this.heading=heading;
        this.speed-=16;
        this.speed < 0 ? this.speed = 0 : "";
      }
    }
    this.motionTimer = setInterval(_=>{
      this.unrender();
      let pixelPerFrame = this.speed/8;
      let rads = degreesToRadians(heading);
      rads = Math.round(rads * 1000) / 1000
      let x = .01 * Math.round( Math.cos(rads) ) * 100 * pixelPerFrame
      let y = .01 * Math.round( Math.sin(rads) ) * 100 * pixelPerFrame
      this.xPos += x;
      this.yPos += y;
      this.turretEndX += x;
      this.turretEndY += y;
      this.checkCollision();
      this.render();
    }, 125);
  }
  checkCollision(){
    let topEdge = this.yPos - this.radius;
    let bottomEdge = this.yPos + this.radius;
    let leftEdge = this.xPos - this.radius;
    let rightEdge = this.xPos + this.radius;
    if (topEdge <= 0){
      this.speed=0;
    } else if (bottomEdge >= 450) {
      this.speed=0;
    } else if (leftEdge <= 0) {
      this.speed=0;
    } else if (rightEdge >= 450) {
      this.speed=0;
    }
    console.log(this.speed);
  }
  aim(deg){
    this.gunDegs = deg;
    this.unrender();
    this.render();
  }
  fire(energy){
    let bulletRadius = 4;
    let pixelPerFrame = 16;
    let rads = degreesToRadians(this.gunDegs);
    rads = Math.round(rads * 1000) / 1000
    let bulletX = this.turretEndX+bulletRadius
    let bulletY = this.turretEndY+bulletRadius
    setInterval(_=>{
      //erase
      this.context.beginPath();
      this.context.arc(bulletX, bulletY, bulletRadius, 0, 2 * Math.PI);
      this.context.lineWidth = bulletRadius*4;
      this.context.fillStyle = '#ffffff';
      this.context.fill();
      this.context.closePath();
      bulletX += .01 * (Math.cos(rads)) * 100 * pixelPerFrame
      bulletY += .01 * (Math.sin(rads)) * 100 * pixelPerFrame
      this.context.beginPath();
      this.context.arc(bulletX, bulletY, bulletRadius, 0, 2 * Math.PI);
      this.context.lineWidth = bulletRadius;
      this.context.fillStyle = '#AA0000';
      this.context.fill();
      this.context.closePath();
    },125)
  }

  render(){
    this.pre();
    //circle aka tank body
    this.context.beginPath();
    this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    this.context.lineWidth = 3;
    this.context.strokeStyle = '#000000';
    this.context.stroke();
    this.context.closePath();
    //gun
    this.context.beginPath();
    this.context.moveTo(this.xPos, this.yPos);
    this.context.lineWidth = 3;
    this.context.strokeStyle = '#000000';
    this.context.lineTo(this.turretEndX, this.turretEndY);
    this.context.stroke();
    this.context.closePath();
  }
  unrender(){
    this.context.beginPath();
    this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    this.context.lineWidth = 9;
    this.context.strokeStyle = '#FFFFFF';
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(this.xPos, this.yPos);
    this.context.lineWidth = 9;
    this.context.strokeStyle = '#FFFFFF';
    this.context.lineTo(this.turretEndX, this.turretEndY);
    this.context.stroke();
    this.context.closePath();
  }
}
