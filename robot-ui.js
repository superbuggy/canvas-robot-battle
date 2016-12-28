class RobotUi extends Robot {
  constructor(){
    super();
    this.radius = 15;
    this.gunDegs = 0;
    this.gunLength = 20;
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.render();
  }

  pre(){
    // let degs = Math.round( radiansToDegrees(Math.atan2(yDiff, xDiff)) );
    // degs = ((90+degs)%360)
    // degs < 0 ? degs+=360 : "";
    //
    this.gunRads = this.gunDegs * (Math.PI/180);
    this.gunRads = Math.round(this.gunRads * 1000) / 1000
    // document.getElementById("sub").innerHTML="pre:",Math.sin(this.gunRads), Math.cos(this.gunRads);
    this.turretEndX = Math.round(this.xPos + Math.cos(this.gunRads) * this.gunLength);
    this.turretEndY = Math.round(this.yPos + Math.sin(this.gunRads) * this.gunLength);
    console.log();
    console.log("#",this.turretEndX, this.turretEndY, this.gunDegs);
  }

  render(){
    this.pre();
    console.log("after pre");
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
    console.log("lineTo", this.xPos, this.turretEndX, this.yPos, this.turretEndY);
    this.context.lineWidth = 3;
    this.context.strokeStyle = '#000000';
    this.context.lineTo(this.turretEndX, this.turretEndY);
    this.context.stroke();
    this.context.closePath();
  }
  unrender(){
    this.context.beginPath();
    this.context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#FFFFFF';
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(this.xPos, this.yPos);
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#FFFFFF';
    this.context.lineTo(this.turretEndX, this.turretEndY);
    this.context.stroke();
    this.context.closePath();
  }
  move(x,y){
    this.unrender();
    this.xPos += x;
    this.yPos += y;
    this.turretEndX += x;
    this.turretEndY += y;
    this.render();
  }
  aim(deg){
    this.gunDegs = deg;
    this.unrender();
    this.render();
  }
}
