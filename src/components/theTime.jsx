import React from 'react'
import { niceTime } from '../scripts/niceTime';
import Config from '../../public/config.json';

const Time = ({ hours, minutes })=> {
  const niceString = niceTime( hours, minutes );

  return(
    <div className={
      `${Config.twentyfour ? 'bigger' :  ''} timeNumbers`
    }
      >{niceString}
    </div>
  )
}
export default Time;