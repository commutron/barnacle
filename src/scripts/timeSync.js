import { getServerDate } from "./serverDate.js";

export async function getTimeOffset(mounted, offsetSet) {
  if(mounted.current === true) {
    let sample = await getServerDate();

    console.log('sampled server time: ' + sample.offset);
    
    offsetSet(sample.offset);
  }
}