import Display from "./display";
import {gravityValues} from './props'

class Game {
    constructor(){  
        this.framecount = 0
        this.t1=performance.now()
        this.lastFrameTime = null
        this.display = new Display(this)
        this.display.view.onFrame = this.update.bind(this)
        this.groundYPos = 800
        this.width = 1300
        this.envProperties = {
            gravitationalAcc: 9.807, 
            groundFriction:{static: 0.4, kinetic: 0.3}
        }
        this.gameObjects = {}
    }
    
    update(){
        this.framecount += 1
        if (this.framecount % 4 == 0){
            this.gravitySelect = document.querySelector("input[name='gravity']:checked")
            this.envProperties.gravitationalAcc = gravityValues[this.gravitySelect.value]
            if (this.framecount % 20 == 0){
                this.t1=performance.now();
            }
        }
        if (this.lastFrameTime){
            // Calculates time elapsed since last frame for use in calculations
            let currentTime = performance.now()
            Object.values(this.gameObjects).forEach(object=>{
                let deltaT = (currentTime - this.lastFrameTime) / 1000
                if (deltaT < 0.5){
                    object.update(deltaT)
                }
            })
            this.lastFrameTime = currentTime
        }else{
            this.lastFrameTime = performance.now()
        }
    }
}

export default Game