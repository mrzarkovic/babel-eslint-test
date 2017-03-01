class Circle {
	constructor(radius) {
		this.radius = radius;
	}

	hello() {
	}
}

class Rectangle {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}

	hello() {
	}
}

let rect = new Rectangle(100, 200);
rect.hello();

let circle = new Circle(100, 200);
circle.hello();