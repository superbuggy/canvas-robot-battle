class Robot {
  constructor(){
      this.xPos = 255;
      this.yPos = 255;
      this.energy = 150;
      this.shield = 0;
      this.hp = 100;
      this.heading = null;
      this.speed = 0;
      this.turretHeading = 0;
  }
  move(heading, speed){
    this.heading = heading;
    this.speed = speed;
  }
}
