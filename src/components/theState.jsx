import React, { useState, useEffect } from 'react'
// import Config from '../../public/config.js';
import Config from '../../public/config.json';

import { niceTime } from '../scripts/niceTime';


import { fireWarn, fireAlarm } from '../scripts/fireAlarms';
import TheLayout from './theLayout';


const TheState = ({ offset, mounted })=> {
  
  const [ noiseState, noiseSet ] = useState( Config.noise );
 
  const [ warnState, warnSet ] = useState( false );
  const [ nowState, nowSet ] = useState( false );

  const [ acDate, setDate ] = useState( new Date() );
  const [ acHr, setHr ] = useState( new Date().getHours() );
  const [ acMn, setMn ] = useState( new Date().getMinutes() );
 
  const updateClocks = () => {  
    // console.log(offset); 

    const serverDate = new Date(Date.now() + offset);

    if(mounted.current === true) {
      setDate( serverDate );
      setHr( serverDate.getHours() );
      setMn( serverDate.getMinutes() );
    }
  };

  useEffect(() => {
    clearInterval(tick);
    
    updateClocks();
    const tick = setInterval(updateClocks, 1000);

    return ()=> { clearInterval(tick); }
  }, [offset]);


  useEffect( ()=>{

    // console.log('minute update');

    const todaysAlarms = Config.week[acDate.getDay()];

    for( let alarm of todaysAlarms ) {
      
      const spl = alarm.split(':');
      const hr = spl[0];
      const mn = spl[1];
      let alarmDate = new Date(acDate);
      alarmDate.setHours(hr);
      alarmDate.setMinutes(mn);
      
      if(acDate.getTime() === alarmDate.getTime()) {
        warnSet(false);
        nowSet(true);
        fireAlarm(noiseState);
        break;
      }

      const diff = acDate.getTime() - alarmDate.getTime(); // in ms
      var minDiff = diff / 60 / 1000; // in minutes
      
      if(minDiff > 0 && minDiff < Config.lightup ) {
        nowSet(true);
        break;
      }

      if(minDiff === -Config.prewarn ) {
        const nextStr = niceTime( hr, mn );
        warnSet(nextStr);
        fireWarn(noiseState);
        break;
      }

      if(minDiff < 0 && minDiff > -Config.prewarn ) {
        const nextStr = niceTime( hr, mn );
        warnSet(nextStr);
        break;
      }

      nowSet(false);
    }
  }, [acMn]);
  
  
  return(
    <TheLayout
      nowState={nowState}
      warnState={warnState}
      noiseState={noiseState}
      noiseSet={noiseSet}
      acHr={acHr}
      acMn={acMn}
    />
  );
};

export default TheState;