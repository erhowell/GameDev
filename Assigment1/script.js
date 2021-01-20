
let allEvents = [];

class UserEvent {
    constructor(name, interval, times) {
      this.name = name;
      this.interval = interval;
      this.times = times;
      this.lastActive = 0;
      this.timebetween =0;
    }
    update(currentTime){
        this.timebetween = currentTime - this.lastActive;
        if((this.lastActive == 0) || (this.timebetween >= this.interval)){
            this.lastActive = currentTime;
            this.times -= 1;
        }
    }
    textOutput() {
        let output = 'Event: '+ this.name +' '+this.times+' Times Remaining.<br />';
        return output;
    } 
  }


  function update(time){ 
      // accepts the elapsed time as a parameter.  It is in the update function where any active events are updated.
        allEvents = allEvents.filter(a => a.times != 0) // filters old events
                    .map(x => {x.update(time); return x;}) // updates events
    }

function render(event){
    // It is in the render function where any events that need reporting are displayed.
    let node = document.getElementById("outputText"); //gets node
    node.innerHTML = event.textOutput() + node.innerHTML; //updates node
    node.scrollTop = 0;// scrolls to top
}

function submitClicked()
{ // adds user event to all events

    //gets inputs
    let eventName = document.getElementById("inputEvent").value;
    let interval = document.getElementById("inputInterval").value;
    let times = document.getElementById("inputTimes").value;
    

    //clears inputs
    document.getElementById("inputEvent").value = "";
    document.getElementById("inputInterval").value = null;
    document.getElementById("inputTimes").value = null;
    
    let ev = new UserEvent(eventName, interval, times);
    ev.update(performance.now());
    render(ev);
    allEvents.push(ev);
}

function gameLoop () {
     // update the elapsed time since the last time the function was called
     //render items needed to be rendered
        if(allEvents.length > 0)
        {
            let time = performance.now();
            update(time);//updates events

            allEvents.filter( e => e.lastActive == time) // updates ui
                .forEach(e=> {
                    render(e);
                    console.log("Event:"+ e.name+":"+ e.timebetween);
                });
        }
    window.requestAnimationFrame(gameLoop);// updates time
}

window.requestAnimationFrame(gameLoop);
