import Display from "./display";
import {gravityValues} from './props'
import {groundImgUrls, canvasImgUrls} from './img_urls'
import {runTutorial} from './tutorial'
import runTwoOrbitDemo from './demos/two-orbit'
import runProjectilesDemo from "./demos/projectiles";
import runOscillationDemo from "./demos/oscillation";

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
        document.querySelector("#two-orbit-demo-button").addEventListener("click", ()=>runTwoOrbitDemo(this))
        document.querySelector("#projectiles-demo-button").addEventListener("click", ()=>runProjectilesDemo(this))
        document.querySelector("#oscillation-demo-button").addEventListener("click", ()=>runOscillationDemo(this))
        document.querySelector("#tutorial-button").addEventListener("click", runTutorial)
        this.gravityOptions = document.querySelectorAll(".gravity-option")
        this.gravityOptions.forEach(option => {
            option.addEventListener("click", this.setActiveGrav)
        })
    }
    
    setActiveGravByName(name){
        this.activeGrav = name
        const selector = `#${name}-grav-button`
        this.gravityOptions.forEach(option=>{
            option.classList.remove("active-option")
        })
        document.querySelector(selector).classList.add("active-option")
    }

    setActiveGrav(e){
        this.activeGrav = e.target.textContent
        this.gravityOptions.forEach(option=>{
            option.classList.remove("active-option")
        })
        e.target.classList.add("active-option")
    }
    
    update(){
        this.framecount += 1
        if (this.framecount % 7 == 0){
            document.querySelector("#view").style.backgroundImage = canvasImgUrls[this.activeGrav];
            document.querySelector("#ground").style.backgroundImage = groundImgUrls[this.activeGrav];
            this.envProperties.gravitationalAcc = gravityValues[this.activeGrav]
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
        Object.values(this.gameObjects).forEach(object=>{
            object.path.remove()
        })
        this.gameObjects = {}
    }

}

export default Game