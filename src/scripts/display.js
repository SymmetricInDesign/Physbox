
const paper = require("paper")
import GameObject from "./game_object"
import Velocity from "./vectors/velocity"

class Display {
    constructor(game){
        this.setupCanvas()
        this.game = game
    }

    setupCanvas(){
        paper.install(window)
        const initYVelInput = document.querySelector("#obj-init-y-vel")
        const initXVelInput = document.querySelector("#obj-init-x-vel")
        const massInput = document.querySelector("#obj-mass")
        const fricCoeffInput = document.querySelector("#obj-fric-coeff")
        const widthInput = document.querySelector("#obj-width")
        const heightInput = document.querySelector("#obj-height")
        const chargeInput = document.querySelector("#obj-charge")
        
        paper.setup('view');
        this.view = view
        let tool = new Tool();
        
        
        tool.onMouseDown = function(event) {
            let exists = Object.values(this.game.gameObjects).some(object=> object.path.contains(event.point))
            if (!exists){
                console.log(event.point)
                let path = new Path.Rectangle(event.point, 
                    [
                        parseFloat(widthInput.value), 
                        parseFloat(heightInput.value)
                    ]
                );
                let objectProps = {
                    fricCoeff: parseFloat(fricCoeffInput.value), 
                    mass: parseFloat(massInput.value), 
                    charge: parseFloat(chargeInput.value),
                    initialVelocity: 
                        new Velocity(
                            parseFloat(initXVelInput.value), 
                            parseFloat(-initYVelInput.value)
                            )
                    }
                path.fillColor = new Color(1, 0, 0.5, 0.93);
                let gameObject = new GameObject(this.game, path, objectProps)
                this.game.gameObjects[path.id] = gameObject
            }
        }.bind(this)
    }
    
}

export default Display