export function fireWarn(noiseState) {
  const audioObj = new Audio('/BELL_0.wav');
  audioObj.addEventListener("canplay", event => {
    noiseState && audioObj.play();
  });
}

export function fireAlarm(noiseState) {
  const audioObj = new Audio('/BELL_3.wav');
  audioObj.addEventListener("canplay", event => {
    noiseState && audioObj.play();
  });
  
  if( typeof window !== "undefined" ) {
    if("Notification" in window) {
      if(Notification.permission === "granted") {
        var notification = new Notification("Break Time", {silent: true});
      }
    }
  }
}