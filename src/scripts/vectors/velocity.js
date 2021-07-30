
class Velocity {
    constructor(x,y){
        this.x = x;
        this.y = y
    }
    add(acceleration, deltaT){
        // console.log(deltaT * acceleration)
        this.x += acceleration.x * deltaT
        this.y += acceleration.y * deltaT
    }
}

export default Velocity