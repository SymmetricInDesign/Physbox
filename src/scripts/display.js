
const paper = require("paper")
import GameObject from "./game_object"

class Display {
    constructor(){
        this.objects = {}
        this.setupCanvas()
    }

    setupCanvas(){
        paper.install(window)
        let canvas = document.getElementById('view');
        canvas.style.background = "lightblue"
        paper.setup('view');
        this.view = view
        let tool = new Tool();
        
        tool.onMouseDown = function(event) {
            let exists = Object.values(this.objects).some(object=> object.path.contains(event.point))
            if (!exists){
                console.log(event.point)
                let path = new Path.Rectangle(event.point, [40, 40]);
                path.fillColor = 'green';
                console.log(path.position.x)
                // path.onMouseUp = (event) => {
                //     delete this.objects[path.id]
                //     path.remove()
                // }
                let gameObject = new GameObject(path, 5)
                this.objects[path.id] = gameObject
                console.log(this.objects)
            }
        }.bind(this)
    }
    
}

export default Display


// const paper = require("paper")
// paper.install(window)

// let t1 = 0
// let t2 = 0
// let framecount = 0

// document.addEventListener("DOMContentLoaded", ()=>{
//     let canvas = document.getElementById('view');
//     canvas.style.background = "lightblue"
//     paper.setup('view');
// 		// Create a simple drawing tool:
// 		let tool = new Tool();
//         // tool.onKeyDown()

// 		// Define a mousedown and mousedrag handler
//         const squares = {}
//         console.log(tool)
//         let exists
// 		tool.onMouseDown = function(event) {
//             exists = Object.values(squares).some(square=> { return square.contains(event.point)})
//             console.log(exists)
//             if (!exists){
//                 // let pathKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//                 let path = new Path.Rectangle(event.point, [40, 40]);
//                 path.fillColor = 'green';
//                 path.onMouseUp = (event) => {
//                     delete squares[path.id]
//                     path.remove()
//                     return
//                 }
//                 squares[path.id] = path
//                 console.log(squares)
//             }
// 		}
//         t1=performance.now()
//         view.onFrame = function(event) {
//             framecount += 1
//             if (framecount == 20){
//                 console.log(`${20000/(performance.now()-t1)} fps`)
//                 t1=performance.now();
//                 framecount = 0;
//             }
//             // On each frame, rotate the path by 3 degrees:
//             Object.values(squares).forEach(square=>{
//                 square.rotate(2)
//             })
//         }

// 		// tool.onMouseDrag = function(event) {
// 		// 	path.add(event.point);
// 		// }
// })