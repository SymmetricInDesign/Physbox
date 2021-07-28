import { Point } from "paper/dist/paper-core"
import Force from "./force"
import Velocity from "./velocity"
import Acceleration from "./acceleration"

class GameObject{
    constructor(game, path, mass, initialVelocity=new Velocity(2,-10))
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
            normalForce: new Force(0, -this.constantForces.gravity.y)
        }
        const totalForce = this.sumForces() 
        this.acceleration = new Acceleration(totalForce.x/mass, totalForce.y/mass)
        // this.checkedForCollisions = false
        // this.momentum = new Momentum(initialVelocity.x * mass, initialVelocity.y * mass)
    }

    updatePos(deltaT, pixelScale){
        // (this.velocity.y)

        if (this.velocity.x != 0) this.updateXPos(deltaT, pixelScale)   
        if (this.velocity.y != 0) this.updateYPos(deltaT, pixelScale)
        let collisionSubject = this.checkForCollisions()
        // (collisionSubject)
        if (collisionSubject){
            let collisionAngle = this.correctCollisionPosition(collisionSubject)
            this.collideWith(collisionSubject, collisionAngle)
        }
    }

    updateXPos(deltaT, pixelScale){
        // console.log(this.velocity.x)
        // debugger
        if (this.velocity.x > 0.1){
            this.path.position.x += (this.velocity.x * pixelScale * deltaT)
        }else{
            this.velocity.x = 0
            this.path.position = new Point(
                    this.path.position.x, 
                    this.game.groundYPos-this.path.bounds.height/2
                )
        }
    }
    updateYPos(deltaT, pixelScale){
            if (this.velocity.y < 0){
                this.setGroundAttachment(false)
            }
        // (this.velocity.y)
            if ((this.path.position.y + this.path.bounds.height/2 < this.game.groundYPos || this.velocity.y < 0) && !this.restingOnObject){
                this.path.position.y += (this.velocity.y * pixelScale * deltaT)
            }else{
                if (this.velocity.y > 0.2){
                    this.velocity.y = this.velocity.y * (-0.3)
                }else{
                    this.velocity.y = 0
                    if (!this.restingOnObject){
                        this.path.position = new Point(
                                this.path.position.x, 
                                this.game.groundYPos-this.path.bounds.height/2
                            )
                        this.setGroundAttachment(true)
                    }else{
                        console.log(this.restingOnObject.path.bounds.point.y)
                        this.path.position = new Point(
                            this.path.position.x, 
                            this.restingOnObject.path.bounds.point.y-this.path.bounds.height/2
                        )
                    }
                }
            }
    }

    updateVelocity(deltaT){
        this.velocity.add(this.acceleration, deltaT)
        this.momentum = this.velocity * this.mass
    }

    updateAcceleration(){
        const force = this.sumForces()
        const newAcc = this.acceleration.update(force, this.mass)
        return newAcc
    }

    //deltaT is the real time interval between the last frame and current frame
    update(deltaT, pixelScale=10){
        this.updatePos(deltaT, pixelScale)
        this.updateVelocity(deltaT)
        this.updateAcceleration()
    }

    setGroundAttachment(attached){
        if (attached){
            this.touchingGround = true
        }else{
            this.touchingGround = false

        }
    }

    setAttachmentToGroundedObject(groundedObject){
        if (!groundedObject && !this.touchingGround){

            debugger
        }
        this.restingOnObject = groundedObject
        // if (this.restingOnObject){
        //     this.constantForces.normalForce = new Force(0, -this.constantForces.gravity.y)
        // }else{
        //     this.constantForces.normalForce = new Force(0, 0)
        // }
    }

    checkIfOnTopOfObject(gameObject){
            if (
                (
                    //check if either bottom corner of the object is within the x-range of the object below
                    this.path.bounds.bottomLeft.x >= gameObject.path.bounds.topLeft.x && this.path.bounds.bottomLeft.x <= gameObject.path.bounds.topRight.x 
                    || 
                    this.path.bounds.bottomRight.x >= gameObject.path.bounds.topLeft.x && this.path.bounds.bottomRight.x <= gameObject.path.bounds.topRight.x
                )
                    //check if vertical space between objects is small
                    && Math.abs(this.path.bounds.bottomRight.y - gameObject.path.bounds.topLeft.y) < 0.05)
                {
                return true
            }else{
                return false
            }
    }


    // will need an override for electromagnetic objects/dynamic gravity.
    sumForces(){
        let sumXForces = 0;
        let sumYForces = 0;
        Object.values(this.constantForces).forEach(force=>{
            sumXForces += force.x;
            sumYForces += force.y
        })
        if (this.touchingGround || this.restingOnObject){
            sumYForces += this.conditionalForces.normalForce.y
            if (this.velocity.x > 0.05){
                sumXForces -= this.conditionalForces.frictionKinetic.x
            } else if (this.velocity.x < -0.05){
                sumXForces += this.conditionalForces.frictionKinetic.x
            }else{

            }
        }
        return new Force(sumXForces, sumYForces)
    }

    distanceTo(gameObject){
        const start = [this.path.position.x, this.path.position.y]
        const end = [gameObject.path.position.x, gameObject.path.position.y]
        return Math.sqrt((end[0]-start[0])**2 + (end[1] - start[1])**2)
    }

    correctCollisionPosition(collisionSubject){
        let intersection = this.path.bounds.intersect(collisionSubject.path.bounds)
        if (intersection.height <= intersection.width && this.velocity.y !=0){
            let timeIntersected = Math.abs(intersection.height / this.velocity.y)
            if (timeIntersected < 1){
                this.path.position = new Point(
                    this.path.position.x,
                    this.path.position.y-(timeIntersected+0.03)*this.velocity.y,
                    )
            }
            if (this.path.position.x <= 10){
            }
            return 0
        }else{
            let timeIntersected = Math.abs(intersection.width / this.velocity.x)
            // (timeIntersected)
            if (timeIntersected < 1){
                this.path.position = new Point(
                    this.path.position.x-(timeIntersected+0.03)*this.velocity.x,
                    this.path.position.y,
                    )

            }
            return 90
        }
    }

    checkForCollisions(){
        let collisionSubject = null
        // this.checkedForCollisions = false
        let restingOnGroundedObject = false
        Object.values(this.game.gameObjects).forEach(gameObject=>{
            if (this.path.intersects(gameObject.path) && gameObject != this && !gameObject.checkedForCollisions){
                // (this.path.position.y, gameObject.path.position.y)
                collisionSubject = gameObject
            }
            if (this.checkIfOnTopOfObject(gameObject)){
                restingOnGroundedObject = true
                this.setAttachmentToGroundedObject(gameObject)
            }
        })
        if (!restingOnGroundedObject){
            this.setAttachmentToGroundedObject(false);
        }else{
            console.log(this)

        }
            
        // this.checkedForCollisions = true
        return collisionSubject
    }

    collideWith(gameObject, collisionAngle){
        if (collisionAngle == 90){
            this.setCollisionVelocities(gameObject, 'x')
        }else if (collisionAngle == 0){
            this.setCollisionVelocities(gameObject, 'y')
            this.checkIfOnGroundedObject(gameObject)
        }      
    }

    checkIfOnGroundedObject(gameObject){
        if (gameObject.touchingGround && Math.abs(this.velocity.y) < 0.1){
            this.setAttachmentToGroundedObject(gameObject)
            return true
        }else{
            this.setAttachmentToGroundedObject(false)
            return false
        }
    }
    setCollisionVelocities(gameObject, axis){
        // equations for resulting velocities from perfectly elastic collision with 0 angle.
        let initialVelocity = Object.assign({},this.velocity)
        const totalMass = this.mass + gameObject.mass
        this.velocity[axis] = 
        (this.mass-gameObject.mass)/(totalMass)*initialVelocity[axis]
        + 
        (2 * gameObject.velocity[axis] * gameObject.mass) / (totalMass)
        gameObject.velocity[axis] = 
        (2 * initialVelocity[axis] * this.mass) / (totalMass)
        - 
        (this.mass-gameObject.mass)/(totalMass) * gameObject.velocity[axis]
    }s
}

export default GameObject