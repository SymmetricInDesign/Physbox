import { Point } from "paper/dist/paper-core";
import GameObject from "../game_object"
import Velocity from "../vectors/velocity"

const paper = require("paper")

export default function runOrbitDemo(game){
    game.setActiveGravByName("Space")
    game.resetObjects()
    setTimeout(()=>{
        createCenterObject(game)
        createOrbitingObject1(game)
        createOrbitingObject2(game)
    }, 150) 
}

function createCenterObject(game){
    let path = new Path.Rectangle(new Point(500,250), [50, 50]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 70000, 
        charge: 0.1,
        initialVelocity: new Velocity(0, 0)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}

function createOrbitingObject1(game){
    let path = new Path.Rectangle(new Point(330,250), [30, 30]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 22, 
        charge: -0.001,
        initialVelocity: new Velocity(0, -5)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}

function createOrbitingObject2(game){
    let path = new Path.Rectangle(new Point(690,270), [30, 30]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 22, 
        charge: -0.001,
        initialVelocity: new Velocity(0, 5)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}