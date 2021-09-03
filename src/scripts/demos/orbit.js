import { Point } from "paper/dist/paper-core";
import GameObject from "../game_object"
import Velocity from "../vectors/velocity"

const paper = require("paper")

export default function runOrbitDemo(game){
    game.setActiveGravByName("Space")
    
    let path = new Path.Rectangle(new Point(500,500), 
        [
            60, 
            60
        ]
    );
    // console.log(initXVelInput.value)
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 20000, 
        charge: 0.1,
        initialVelocity: new Velocity(0, 0)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
    console.log(gameObject)
}