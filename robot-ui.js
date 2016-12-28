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
        this.speed < 0 ? this.speed=0: "";
      }
    }
    this.motionTimer = setInterval(_=>{
      this.unrender();
      let pixelPerFrame = this.speed/8;
      let rads = degreesToRadians(heading);
      rads = Math.round(rads * 1000) / 1000
      let x = Math.round(Math.round(Math.cos(rads)) * 100 * pixelPerFrame)/100
      let y = Math.round(Math.round(Math.sin(rads)) * 100 * pixelPerFrame)/100
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

  render(){
    this.pre();
    //circle
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
