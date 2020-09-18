class Score {
  constructor() {
    this.score = 0;
  }
  
  display() {
    fill('#fff');
    textAlign(RIGHT);
    textSize(50);
    text(parseInt(this.score), width - 50, 50);
  }
  
  increment(value) {
    this.score += value;
    if (this.score % 20 <= 0.1) {
      maxJokerSpeed++;
    }
  }
  
}