class Life {
  constructor() {
  }

  display() {
    for (let i = 0; i < lives; i++) {
      image(lifeImage, 40 + (60 * i), 40, 45, 45);
    }
  }

  freeze() {
    setTimeout(() => {
      isColliding = false;
    }, 1000);
  }

}