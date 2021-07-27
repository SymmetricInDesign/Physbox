import Display from "./display";

class Game {
    constructor(){  
        this.framecount = 0
        this.t1=performance.now()
        this.lastFrameTime = null
        this.display = new Display(this)
        this.display.view.onFrame = this.update.bind(this)
        this.groundYPos = 800
        this.envProperties = {
            gravitationalAcc: 9.807, 
            groundFriction:{static: 0.3, kinetic: 0.2}
        }
        this.gameObjects = {}
    }

    update(){
        this.framecount += 1
        if (this.framecount == 20){
            // console.log(`${20000/(performance.now()-this.t1)} fps`)
            this.t1=performance.now();
            this.framecount = 0;
        }
        if (this.lastFrameTime){
            let currentTime = performance.now()
            Object.values(this.gameObjects).forEach(object=>{
                let deltaT = (currentTime - this.lastFrameTime) / 1000
                // console.log(deltaT)
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