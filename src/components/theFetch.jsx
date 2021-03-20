import React, { useRef, useState, useEffect, Fragment } from 'react'
import Config from '../../public/config.json';

import { getTimeOffset } from '../scripts/timeSync';

import TheState from './theState';

const TheFetch = () => {

  if( typeof window !== "undefined" ) {
    if(!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }

  const mounted = useRef(true);

  useEffect(() => { 
    return () => { mounted.current = false; }; 
  }, []);

  const [ offset, offsetSet ] = useState( 0 );

  useEffect(() => {
    // console.log('get offset');

    getTimeOffset(mounted, offsetSet);
    const sync = setInterval(()=>getTimeOffset(mounted, offsetSet), Config.sync);
    return ()=> { clearInterval(sync); }
  }, []);

  if(offset !== false) {
    return(
      <TheState
        offset={offset}
        mounted={mounted} />
    );
  }

  return null;
};

export default TheFetch;