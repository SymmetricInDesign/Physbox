class Velocity {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(acceleration, deltaT) {
		this.x += acceleration.x * deltaT;
		this.y += acceleration.y * deltaT;
	}
}

export default Velocity;
