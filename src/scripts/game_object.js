import { Point } from "paper/dist/paper-core"
import Force from "./force"
import Velocity from "./velocity"
import Acceleration from "./acceleration"

class GameObject{
    constructor(game, path, mass, initialVelocity=new Velocity(3,0))
    {
        const {gravitationalAcc, groundFriction} = game.envProperties
        this.game = game
        this.path = path
        this.mass = mass
        this.velocity = initialVelocity
        this.constantForces = {
            gravity: new Force(0, gravitationalAcc * mass),
        }
        this.conditionalForces = {
            frictionKinetic: new Force(gravitationalAcc * mass * groundFriction.kinetic,0),
            frictionStatic: new Force(gravitationalAcc * mass * groundFriction.static,0),
        }
        this.acceleration = new Acceleration(0, -game.envProperties.gravitationalAcc)
    }

    updatePos(deltaT, pixelScale){
        if (this.velocity.x != 0) this.updateXPos(deltaT, pixelScale)   
        if (this.velocity.y != 0) this.updateYPos(deltaT, pixelScale)
    }

    updateXPos(deltaT, pixelScale){
        if (this.path.position.x + this.path.bounds.height/2 < 1200 || this.velocity.x < 0){
            this.path.position.x += (this.velocity.x * pixelScale * deltaT)
        }else{
            if (this.velocity.x > 0.2){
                this.velocity.x = this.velocity.x * (-0.3)
            }else{
                this.velocity.x = 0
                this.path.position = new Point(
                        this.path.position.x, 
                        this.game.groundYPos-this.path.bounds.height/2
                    )
            }
        }
    }
    updateYPos(deltaT, pixelScale){
            if (this.path.position.y + this.path.bounds.height/2 < this.game.groundYPos || this.velocity.y < 0){
                this.path.position.y += (this.velocity.y * pixelScale * deltaT)
            }else{
                if (this.velocity.y > 0.2){
                    this.velocity.y = this.velocity.y * (-0.3)
                }else{
                    this.velocity.y = 0
                    this.path.position = new Point(
                            this.path.position.x, 
                            this.game.groundYPos-this.path.bounds.height/2
                        )
                }
            }
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
        Object.values(this.constantForces).forEach(force=>{
            sumXForces += force.x;
            sumYForces += force.y
        })
        // if (this.path.position.y + this.path.bounds.height/2 >= this.game.groundYPos){
        //     if (this.velocity.x > 0){
        //         sumXForces -= this.conditionalForces.frictionKinetic
        //     } else{
        //         sumXForces += this.conditionalForces.frictionKinetic 

        //     }
        // }
        return new Force(sumXForces, sumYForces)
    }

    distanceTo(gameObject){
        const start = [this.path.position.x, this.path.position.y]
        const end = [gameObject.path.position.x, gameObject.path.position.y]
        return Math.sqrt((end[0]-start[0])**2 + (end[1] - start[1])**2)
    }
}

export default GameObject