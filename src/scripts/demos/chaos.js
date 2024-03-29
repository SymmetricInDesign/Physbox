import { Point } from "paper/dist/paper-core";
import GameObject from "../../entities/game_object.js";
import Velocity from "../../entities/vectors/velocity";

const paper = require("paper");

export default function runChaosDemo(game) {
	game.setActiveGravByName("Moon");
	game.resetObjects();
	setTimeout(() => {
		createObjects(game);
	}, 150);
}

function createObject(x, y, v_x, v_y, charge, mass, game, length, width) {
	let path = length
		? new Path.Rectangle(new Point(x, y), [length, width])
		: new Path.Rectangle(new Point(x, y), [15, 15]);
	let objectProps = {
		fricCoeff: 0.3,
		mass: mass,
		charge: charge,
		initialVelocity: new Velocity(v_x, v_y),
	};
	path.fillColor = new Color(1, 0, 0.5, 0.93);
	let gameObject = new GameObject(game, path, objectProps);
	game.gameObjects[path.id] = gameObject;
}

function createObjects(game) {
	//bottom left row
	createObject(100, 550, 10, -10, 0.01, 200, game);
	createObject(150, 550, 10, -10, 0.01, 200, game);
	createObject(200, 550, 10, -10, 0.0, 200, game);
	createObject(250, 550, 10, -10, 0.0, 200, game);
	createObject(300, 550, 10, -10, 0.0, 200, game);

	createObject(500, 300, 0, -10, -0.5, 20000, game, 50, 50);

	createObject(200, -1000, 0, -10, 1, 200000, game, 80, 80);

	createObject(400, 220, 20, 0, -0.01, 200, game);
	createObject(900, 220, -20, 0, -0.01, 200, game);

	//bottom right row
	createObject(750, 550, -10, -13, 0, 200, game);
	createObject(ground, 550, -10, -13, 0, 200, game);
	createObject(850, 550, -10, -13, 0.01, 200, game);
	createObject(900, 550, -10, -13, 0.01, 200, game);
	createObject(950, 550, -10, -13, 0, 200, game);
	createObject(1000, 550, -10, -13, 0, 200, game);
}
