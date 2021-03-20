import React, { Fragment } from 'react';

import Time from './theTime';
import Button from './theButton';

const TheLayout = ({ nowState, warnState, noiseState, noiseSet, acHr, acMn })=> (
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

export default TheLayout;