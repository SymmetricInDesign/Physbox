import Display from "./display";

class Game {
    constructor(){  
        this.display = new Display()
        this.framecount = 0
        this.display.view.onFrame = this.update.bind(this)
        this.t1=performance.now()
        this.lastFrameTime = null
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
            Object.values(this.display.objects).forEach(object=>{
                let deltaT = (currentTime - this.lastFrameTime) / 1000
                console.log(deltaT)
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