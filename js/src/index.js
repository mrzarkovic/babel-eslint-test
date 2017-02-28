class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  hello() {
	  console.log("hi!");
  }
}

var rect = new Rectangle(100, 200);
rect.hello();