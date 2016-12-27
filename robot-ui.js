// import 'Robot' from './robot'

function degreesToRadians (degrees) {
  return degrees * (Math.PI/180);
}

function radiansToDegrees (radians) {
  return radians * (180/Math.PI);
}

class RobotUi extends Robot {
  constructor(){
    super();
    this.radius = 15;
    this.gunHdn = 270;
    console.log("gunHdn", Math.sin(degreesToRadians(this.gunHdn)));
    this.gunLength = 20;
    this.gunRdns = this.gunHdn * (Math.PI/180);
    this.gunRdns = Math.round(this.gunRdns * 1000) / 1000
    console.log(Math.sin(this.gunRdns), Math.cos(this.gunRdns));
    this.turretEndX = Math.round(this.xPos + Math.sin(this.gunRdns) * this.gunLength);
    this.turretEndY = Math.round(this.yPos + Math.cos(this.gunRdns) * this.gunLength);
    console.log(this.turretEndX, this.turretEndY);
    this.render()
  }
  render(){
    var self = this;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.beginPath();
    console.log(self, context, "in ui.js render");
    console.log(self.xPos, self.yPos, self.radius);
    context.arc(self.xPos, self.yPos, self.radius, 0, 2 * Math.PI);
    context.lineWidth = 3;
    context.strokeStyle = '#000000';
    context.stroke();


    context.beginPath();
    context.moveTo(self.xPos, self.yPos);
    console.log("lineTo", self.xPos+self.turretEndX, self.yPos+self.turretEndY);
    context.lineWidth = 3;
    context.strokeStyle = '#000000';
    context.lineTo(self.turretEndX, self.turretEndY);
    console.log(self.turretEndX, self.turretEndY);
    context.stroke();
  }
  unrender(){
    var self = this;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(self.xPos, self.yPos, self.radius, 0, 2 * Math.PI);
    context.lineWidth = 4;
    context.strokeStyle = '#FFFFFF';
    context.stroke();
    context.beginPath();
    context.moveTo(self.xPos, self.yPos);
    context.lineWidth = 4;
    context.strokeStyle = '#FFFFFF';
    context.lineTo(self.turretEndX, self.turretEndY);
    context.stroke();
  }
  move(x,y){
    this.unrender();
    this.xPos += x;
    this.yPos += y;
    this.turretEndX += x;
    this.turretEndY += y;
    this.render();
  }
}
