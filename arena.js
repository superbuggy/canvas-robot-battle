class Arena {
  constructor(){
    let self = this;
      self.canvas = document.getElementById('canvas');
      self.context = canvas.getContext('2d');
      self.canvas.width = 450;
      self.canvas.height = 450;
      self.centerX = self.canvas.width / 2;
      self.centerY = self.canvas.height / 2;
  }
}
var bob;
var GameArena;
window.onload = function(){
  GameArena = new Arena();
  bob = new RobotUi();
  console.log(bob);
}
