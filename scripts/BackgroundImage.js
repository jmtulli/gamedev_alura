class BackgroundImage {
  constructor(image, speed) {
    this.image = image;
    this.speed = speed;
    this.xStart = 0;
    this.xEnd = width;
  }

  display() {
    image(this.image, this.xStart, 0, width, height);
    image(this.image, this.xEnd + 1, 0, width, height);
  }

  move() {
    this.xStart = this.xStart - this.speed;
    this.xEnd = this.xEnd - this.speed;
    if (this.xStart < -width) {
      this.xStart = width;
    }
    if (this.xEnd < -width) {
      this.xEnd = width;
    }
  }

}