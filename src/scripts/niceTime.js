import Config from '../../public/config.json';

export function niceTime(hr, min) {
  const numHr = Number(hr);
  const numMin = Number(min);

  const strMn = numMin.toString().padStart(2, 0);

  if(Config.twentyfour) {
    const strHr = numHr.toString().padStart(1, 0);

    const timeStr = `${strHr}:${strMn}`;

    return timeStr;
    
  }else{
    const twelveHr = numHr === 0 ? 12 : numHr > 12 ? numHr - 12 : numHr;
    const strHr = twelveHr.toString();

    const stAp = numHr >= 12 ? 'p.m.' : 'a.m.';

    const timeStr = `${strHr}:${strMn} ${stAp}`;

    return timeStr;
  }
}
