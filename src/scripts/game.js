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
        this.gravitySelect = document.querySelector("input[name='gravity']:checked")
        this.envProperties.gravitationalAcc = gravityValues[this.gravitySelect.value]
        console.log(this.gravitySelect.value)
        // console.log(this.envProperties.gravitationalAcc)
        this.framecount += 1
        if (this.framecount == 20){
            // console.log(`${20000/(performance.now()-this.t1)} fps`)
            this.t1=performance.now();
            this.framecount = 0;
        }
        if (this.lastFrameTime){
            let currentTime = performance.now()
            Object.values(this.gameObjects).forEach(object => object.checkedForCollisions=false)
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