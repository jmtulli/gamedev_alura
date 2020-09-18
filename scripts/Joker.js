class Joker {
  constructor(joker, jokerVerticalPoint, matrizJokerPositions, speed) {
    this.joker = joker;
    this.jokerVerticalPoint = jokerVerticalPoint;
    this.matrizJokerPositions = matrizJokerPositions;
    this.speed = speed
    this.currentFrame = 0;
    this.currentX = width;
    this.refresh = true;
    this.visible = true;
  }

  display() {
    image(this.joker, this.currentX, this.jokerVerticalPoint, 104, 100, this.matrizJokerPositions[this.currentFrame][0], this.matrizJokerPositions[this.currentFrame][1], 52, 50);
    if (this.refresh) {
      this.currentFrame++;
      if (this.currentFrame > this.matrizJokerPositions.length - 1) {
        this.currentFrame = 0;
      }
    }
    this.refresh = !this.refresh;
  }

  move() {
    this.currentX -= this.speed;
    if (this.currentX < -60) {
      this.currentX = width;
      this.visible = false;
    }
  }

}