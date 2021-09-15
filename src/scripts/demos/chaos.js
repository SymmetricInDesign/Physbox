import { Point } from "paper/dist/paper-core";
import GameObject from "../game_object"
import Velocity from "../vectors/velocity"

const paper = require("paper")

export default function runChaosDemo(game){
    game.setActiveGravByName("Moon")
    game.resetObjects()
    setTimeout(()=>{
        createObjects(game)
    }, 150) 
}

function createObject(x, y, v_x, v_y, charge, mass, game, length, width){
    let path = length ? new Path.Rectangle(new Point(x,y), [length, width]) : new Path.Rectangle(new Point(x,y), [15, 15]);
    let objectProps = {
        fricCoeff: 0.3, 
        mass: mass, 
        charge: charge,
        initialVelocity: new Velocity(v_x, v_y)
    }
    path.fillColor = new Color(1, 0, 0.5, 0.93);
    let gameObject = new GameObject(game, path, objectProps)
    game.gameObjects[path.id] = gameObject
}

function createObjects(game){
    //bottom left row
    createObject(300, 700, 10, -10, 0.01, 200, game)
    createObject(350, 700, 10, -10, 0.01, 200, game)
    createObject(400, 700, 10, -10, 0.00, 200, game)
    createObject(450, 700, 10, -10, 0.00, 200, game)
    createObject(500, 700, 10, -10, 0.00, 200, game)

    createObject(700, 300, 0, -10, -0.5, 20000, game, 50, 50)

    createObject(300, -1000, 0, -10, 1, 200000, game, 80, 80)

    createObject(400, 220, 20, 0, -0.01, 200, game)
    createObject(1000, 220, -20, 0, -0.01, 200, game)

    //bottom right row
    createObject(800, 770, -10, -13, 0, 200, game)
    createObject(850, 770, -10, -13, 0, 200, game)
    createObject(900, 770, -10, -13, 0.01, 200, game)
    createObject(950, 770, -10, -13, 0.01, 200, game)
    createObject(1000, 770, -10, -13, 0, 200, game)
    createObject(1050, 770, -10, -13, 0, 200, game)

    // createObject(1050, 770, -10, -13, 0, 200, game)
    // createObject(1050, 770, -10, -13, 0, 200, game)
    // createObject(1050, 770, -10, -13, 0, 200, game)
    // createObject(1050, 770, -10, -13, 0, 200, game)
    // createObject(1050, 770, -10, -13, 0, 200, game)
    // createObject(1050, 770, -10, -13, 0, 200, game)
    // createObject(1050, 770, -10, -13, 0, 200, game)
}
