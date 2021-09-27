import { Point } from "paper/dist/paper-core";
import GameObject from "../game_object"
import Velocity from "../vectors/velocity"

const paper = require("paper")

export default function runOscillationDemo(game){
    game.setActiveGravByName("Space")
    game.resetObjects()
    setTimeout(()=>{
        createCenterObject(game)
        createLeftObject(game)
        createRightObject(game)
    }, 150) 
}

function createCenterObject(game){
    let path = new Path.Rectangle(new Point(130,420), [20, 20]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 50, 
        charge: 0.01,
        initialVelocity: new Velocity(0, 0)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}

function createLeftObject(game){
    let path = new Path.Rectangle(new Point(30,400), [20, 60]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 100000, 
        charge: 0.05,
        initialVelocity: new Velocity(0, 0)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}
function createRightObject(game){
    let path = new Path.Rectangle(new Point(1050,400), [20, 60]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 100000, 
        charge: 0.1,
        initialVelocity: new Velocity(0, 0)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}