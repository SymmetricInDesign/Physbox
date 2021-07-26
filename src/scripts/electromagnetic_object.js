import GameObject from "./game_object"

class ElectromagneticObject extends GameObject{
    constructor(path, mass, initialVelocity=0, charge=1){
        super(path,  mass, initialVelocity)
        this.charge = charge
    }

    calculateCoulombForce(electromagneticobjects)
}