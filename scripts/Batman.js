class Batman {
  constructor(batmanImage, batmanVerticalPoint, matrizBatmanPositions) {
    this.batmanImage = batmanImage;
    this.batmanVerticalPoint = batmanVerticalPoint;
    this.matrizBatmanPositions = matrizBatmanPositions;
    this.currentFrame = 0;
    this.batmanGroundHeight = batmanVerticalPoint;
    this.jumpValue = 0;
    this.jumping = false;
    this.lastJump = false;
  }

  display() {
    image(this.batmanImage, 0, this.batmanVerticalPoint, 140, 100, this.matrizBatmanPositions[this.currentFrame][0], this.matrizBatmanPositions[this.currentFrame][1], 70, 50);
    this.currentFrame++;
    if (this.currentFrame > this.matrizBatmanPositions.length - 1) {
      this.currentFrame = 0;
    }
  }

  jump() {
    if (!this.jumping || this.lastJump) {
      jumpSound.play();
      this.jumpValue = 25;
      this.jumping = true;
      this.lastJump = !this.lastJump;
    }
  }

  applyGravity() {
    if (this.jumping) {
      this.batmanVerticalPoint = this.batmanVerticalPoint - this.jumpValue;
      this.jumpValue -= 2.5;
      if (this.batmanVerticalPoint > this.batmanGroundHeight) {
        this.batmanVerticalPoint = this.batmanGroundHeight;
        this.jumpValue = 0;
        this.jumping = false;
        this.lastJump = false;
      }
    }
  }

  blink() {
    setTimeout(() => {
      blinking = false;
    }, 50);
  }

  isCollidingWith(enemy) {
    return !isColliding && collideRectRect(
      0 + (140 * 0.15), this.batmanVerticalPoint + (100 * 0.05),
      140 * 0.7, 100 * 0.8,
      enemy.currentX + (104 * 0.2), enemy.jokerVerticalPoint + (100 * 0.1),
      104 * 0.7, 100 * 0.8);
  }

}