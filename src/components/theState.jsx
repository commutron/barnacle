import React, { useRef, useState, useEffect, Fragment } from 'react'
// import Config from '../../public/config.js';
import Config from '../../public/config.json';

import { niceTime } from '../scripts/niceTime';
import { getTimeOffset } from '../scripts/timeSync';

import { fireWarn, fireAlarm } from '../scripts/fireAlarms';
import Time from './theTime';
import Button from './theButton';

const TheState = ()=> {

  const mounted = useRef(true);

  useEffect(() => { return () => { mounted.current = false; }; }, []);
  
  if( typeof window !== "undefined" ) {
    if(!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }

  const [ noiseState, noiseSet ] = useState( Config.noise );
 
  const [ warnState, warnSet ] = useState( false );
  const [ nowState, nowSet ] = useState( false );

  const [ offset, offsetSet ] = useState( false );

  const [ acDate, setDate ] = useState( new Date() );
  const [ acHr, setHr ] = useState( new Date().getHours() );
  const [ acMn, setMn ] = useState( new Date().getMinutes() );
 
  const updateClocks = () => {    
    if(offset !== false) {
      const serverDate = new Date(Date.now() + offset);

      if(mounted.current === true) {
        setDate( serverDate );
        setHr( serverDate.getHours() );
        setMn( serverDate.getMinutes() );
      }
    }
  };

  useEffect(() => {
    getTimeOffset(mounted, offsetSet);
    setInterval(()=>getTimeOffset(mounted, offsetSet), Config.sync);
    return ()=> { clearInterval(getTimeOffset); }
  }, []);

  useEffect(() => {
    updateClocks();
    setInterval(updateClocks, 1000);

    return ()=> { clearInterval(updateClocks); }
  }, [offset]);

  useEffect( ()=>{
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
    <Fragment>
      <main className={nowState ? 'lightup' : ''}>
        <Time
          hours={acHr}
          minutes={acMn}
        />
        <div className='messageBox'>
          {warnState ? `Next Break @ ${warnState}` : null}
        </div>
      </main> 
      <footer className={nowState ? 'lightup' : ''}>
        <Button
          stateThing={noiseState}
          setThing={noiseSet} 
        />
        <span>Commutron Industries Ltd.</span>
      </footer>
    </Fragment>
  );
};

export default TheState;