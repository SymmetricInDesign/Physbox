let next = false;

export const runTutorial = function(){
    let modalblur = document.createElement("div")
    modalblur.classList.add("modal-blur")
    document.querySelector("body").appendChild(modalblur)
    const propsDiv = document.querySelector("#object-properties")
    const forcesDiv = document.querySelector("#forces")
    const controlsDiv = document.querySelector("#controls")
    let msg;
    
    //properties sequence
    function propsSequence(){
        propsDiv.style.zIndex = 2;

        msg = "<p> Here you can assign object properties, which will affect how the object behaves according to the laws of physics. </p> <p> Higher masses will resist movement more, and higher charges will exert greater force on other charged objects. Positive charges will attract negative charges and repel positive charges. </p> <p> Initial velocities may be assigned to propel the object in a certain direction on creation. </p>"

        let propsMessage = new TutorialMessage(msg, "div", propsDiv, {x: "330px", y:"70px"})
        function propsLoop(){
            if (!next){
                setTimeout(propsLoop, 100);
            }else{
                propsDiv.style.zIndex = "unset"
                propsMessage.remove()
                next=false
                forcesSequence()
            }
        }
        propsLoop()
    }

    propsSequence()

    //forces sequence
    function forcesSequence(){
        forcesDiv.style.zIndex = 2;
        msg = "<p> Here you can assign the environment properties, such as surface gravity, which will affect objects' gravitational acceleration. </p>"
        let forcesMessage = new TutorialMessage(msg, "div", forcesDiv, {x: "-650px", y:"120px"})
        function forcesLoop(){
            if (!next){
                setTimeout(forcesLoop, 100);
            }else{
                forcesDiv.style.zIndex = "unset"
                forcesMessage.remove()
                next=false
                controlsSequence()
            }
        }
        forcesLoop()
    }

    //controls sequence
    function controlsSequence(){
        controlsDiv.style.zIndex = 2;
        msg = "<p> Here you can clear the board, removing all objects.</p>"
        let controlsMessage = new TutorialMessage(msg, "div", controlsDiv, {x: "-10px", y:"70px"})
        function controlsLoop(){
            if (!next){
                setTimeout(controlsLoop, 100);
            }else{
                controlsDiv.style.zIndex = "unset"
                controlsMessage.remove()
                next=false
                finalSequence()
            }
        }
        controlsLoop()
    }
    
    //end tutorial
    function finalSequence(){
        msg = "<p>Click to place an object with the properties you selected at the cursor. Observe as it reacts to the environmental forces and its fellow objects.</p>"
        let finalMessage = new TutorialMessage(msg, "div", controlsDiv, {x: "150px", y:"400px"})
        finalMessage.el.style.width = "1000px"
        finalMessage.nextButton.textContent = "Begin!"
        function finalLoop(){
            if (!next){
                setTimeout(finalLoop, 100);
            }else{
                finalMessage.remove()
                next=false
                //end tutorial
                modalblur.remove()
            }
        }
        finalLoop()
    }


  
}

class TutorialMessage{
    constructor(msg="Hello", tagName="div", parent=document.querySelector("body"), pos={x: "0px", y: "0px"}){
        this.el = document.createElement(tagName)
        this.parent = parent
        this.el.classList.add("tutorial-message")
        parent.appendChild(this.el)
        this.el.style.top = pos.y
        this.el.style.left = pos.x
        this.el.innerHTML = msg
        this.nextButton = document.createElement("div")
        this.nextButton.textContent = "Continue"
        this.nextButton.classList.add("button")
        this.nextButton.addEventListener("click", () => next=true)
        this.el.appendChild(this.nextButton)
    }

    remove(){
        this.el.remove()
    }

}