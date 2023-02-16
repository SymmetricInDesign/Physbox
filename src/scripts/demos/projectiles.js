import { Point } from "paper/dist/paper-core";
import GameObject from "../game_object"
import Velocity from "../vectors/velocity"

const paper = require("paper")

export default function runProjectilesDemo(game){
    game.setActiveGravByName("Earth")
    game.resetObjects()
    setTimeout(()=>{
        createLeftObject(game)
        createRightObjects(game)
    }, 150) 
}

function createLeftObject(game){
    let path = new Path.Rectangle(new Point(400,400), [60, 60]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: 4000, 
        charge: 0,
        initialVelocity: new Velocity(0, 0)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}

function createRightObjects(game){
    let path1 = new Path.Rectangle(new Point(800,400), [10, 10]);
    let path2 = new Path.Rectangle(new Point(900,420), [10, 10]);
    let path3 = new Path.Rectangle(new Point(1000,440), [10, 10]);
    let object1Props = {
        fricCoeff: 0.5, 
        mass: 70, 
        charge: 0,
        initialVelocity: new Velocity(-45, 0)
    }
    let object2Props = {
        fricCoeff: 0.5, 
        mass: 70, 
        charge: 0,
        initialVelocity: new Velocity(-45, 0)
    }
    let object3Props = {
        fricCoeff: 0.5, 
        mass: 70, 
        charge: 0,
        initialVelocity: new Velocity(-45, 0)
    }
    path1.fillColor = new Color(1, 0, 0.5, 0.93);
    path2.fillColor = new Color(1, 0, 0.5, 0.93);
    path3.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject1 = new GameObject(game, path1, object1Props)
    let gameObject2 = new GameObject(game, path2, object2Props)
    let gameObject3 = new GameObject(game, path3, object3Props)
    game.gameObjects[path1.id] = gameObject1
    game.gameObjects[path2.id] = gameObject2
    game.gameObjects[path3.id] = gameObject3
}
