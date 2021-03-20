export async function getTimeOffset(mounted, offsetSet) {

  try {
    fetch('https://commutron-time.netlify.app/.netlify/functions/server-time')
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }else{
          return response.json();
        }
      })
      .then(datetime => {
        const syncDate = new Date( datetime.server_time );

        const clientDate = new Date();

        const offset = syncDate - clientDate;
        
        // console.log('synced');
        if(mounted.current === true) {
          offsetSet(offset);
        }
      });
  }
  catch{
    throw new Error('Function was not ok');
  }
}