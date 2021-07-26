
class Acceleration {
    constructor(x,y){
        this.x = x
        this.y = y
    }
    update(force, mass){
        this.x = force.x / mass, 
        this.y = force.y / mass
    }
} 

export default Acceleration