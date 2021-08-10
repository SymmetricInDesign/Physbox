import Display from "./display";
import {gravityValues} from './props'
import {groundImgUrls, canvasImgUrls} from './img_urls'

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
        this.activeGrav = "Earth"
        this.resetObjects = this.resetObjects.bind(this)
        this.setActiveGrav = this.setActiveGrav.bind(this)
        document.querySelector("#reset-button").addEventListener("click", this.resetObjects)
        document.querySelectorAll(".gravity-option").addEventListener("click", this.setActiveGrav)
    }

    setActiveGrav(e){
        this.activeGrav = e.target.textContent
    }
    
    update(){
        this.framecount += 1
        if (this.framecount % 7 == 0){
            this.gravitySelect = document.querySelector("input[name='gravity']:checked")
            document.querySelector("#view").style.backgroundImage = canvasImgUrls[this.gravitySelect.value];
            document.querySelector("#ground").style.backgroundImage = groundImgUrls[this.gravitySelect.value];
            this.envProperties.gravitationalAcc = gravityValues[this.gravitySelect.value]
            // if (this.framecount % 20 == 0){
            //     this.t1=performance.now();
            // }
        }
        if (this.lastFrameTime){
            // Calculates time elapsed since last frame for use in calculations
            let currentTime = performance.now()
            Object.values(this.gameObjects).forEach(object=>{
                object.path.fillColor.hue += 0.2;
                let deltaT = (currentTime - this.lastFrameTime) / 1000
                if (deltaT < 0.5){
                    object.update(deltaT, this.framecount)
                }
            })
            this.lastFrameTime = currentTime
        }else{
            this.lastFrameTime = performance.now()
        }
    }

    resetObjects(){
        console.log(this.gameObjects)
        Object.values(this.gameObjects).forEach(object=>{
            object.path.remove()
        })
        this.gameObjects = {}
    }
}

export default Game