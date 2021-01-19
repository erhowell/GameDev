
let allEvents = [];
class UserEvent {
    constructor(name, interval, times) {
      this.name = name;
      this.interval = interval;
      this.times = times;
      this.lastActive = 0;
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
        allEvents = allEvents.map(x => {x.update(time); return x;})
                    .sort((e1,e2) => {return e2.timebetween- e1.timebetween;});
        
        allEvents.forEach(e => {
            if(e.lastActive == time)
            {
                render(e);
            }
        });
        allEvents = allEvents.filter(a => a.times > 0);
    }

function render(event){
    // It is in the render function where any events that need reporting are displayed.
    
    let node = document.getElementById("outputText")
    node.innerHTML = event.textOutput() + node.innerHTML;
    node.scrollTop = node.scrollHeight;
}

function submitClicked()
{ // adds user event to all events
    console.log('submitClicked');
    let eventName = document.getElementById("inputEvent").value;
    let interval = document.getElementById("inputInterval").value;
    let times = document.getElementById("inputTimes").value;
    
    allEvents.push(new UserEvent(eventName, interval, times));
    
}
function gameLoop () {
     // in which you update the elapsed time since the last time the function was called
        if(allEvents.length > 0)
        {
            update(performance.now());
        }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
