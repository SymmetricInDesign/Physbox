import { Point } from "paper/dist/paper-core"
import Force from "./force"
import Velocity from "./velocity"
import Acceleration from "./acceleration"

class GameObject{
    constructor(path, mass, initialVelocity=new Velocity(0,0), gravitationalAcc = 9.807){
        this.path = path
        this.mass = mass
        this.velocity = initialVelocity
        this.forces = {gravity: new Force(0, gravitationalAcc * mass)}
        this.acceleration = new Acceleration(0, -gravitationalAcc)
        this.stopped = false
    }

    updatePos(deltaT, pixelScale){
        //pixelscale is the number of pixels equal to a meter, to work with STI units.
        // console.log(deltaT)
        // debugger
        this.path.position = new Point(
            this.path.position.x + (this.velocity.x * pixelScale * deltaT),
            this.path.position.y + (this.velocity.y * pixelScale * deltaT)
            )
            // console.log(this.velocity)
    }

    updateVelocity(deltaT){
        this.velocity.add(this.acceleration, deltaT)
    }

    updateAcceleration(){
        const force = this.sumForces()
        this.acceleration.update(force, this.mass)
    }

    //deltaT is the real time interval between the last frame and current frame
    update(deltaT, pixelScale=10){
        this.updatePos(deltaT, pixelScale)
        this.updateVelocity(deltaT)
        this.updateAcceleration()
    }


    // will need an override for electromagnetic objects/dynamic gravity.
    sumForces(){
        let sumXForces = 0;
        let sumYForces = 0;
        Object.values(this.forces).forEach(force=>{
            sumXForces += force.x;
            sumYForces += force.y
        })
        return new Force(sumXForces, sumYForces)
    }

    distanceTo(gameObject){
        const start = [this.path.position.x, this.path.position.y]
        const end = [gameObject.path.position.x, gameObject.path.position.y]
        return Math.sqrt((end[0]-start[0])**2 + (end[1] - start[1])**2)
    }
}

export default GameObject