# barnacle

An alarm clock utility. Syncs time the host server and shows notifications on a recurring schedule of times.

The goal is to get every client to share the same time even if the desktop time is inccorrect.

The time is not accurate to the millisecond as it is not compensating for the API call delay.
Even on a poor connection the round trip is negligible so more accuracy is not deemed worth while at this time.

If the server API is unavailable, it will continue to work but off of the local computer time.


config.json

````
  // Display 24 hour time
  "twentyfour" : false,

  // Display seconds
  "seconds" : false,

  // Default state of volume toggle
  "noise" : false,

  // Recuring alarm times for a week. 0 = Sunday.
  // Must be in 24 hour time with leading zeros.
  "week" : {
      "0": [],
      "1": ["09:15", "11:45", "14:15", "16:30"],
      "2": ["09:15", "11:45", "14:15", "16:30"],
      "3": ["09:15", "11:45", "14:15", "16:30"],
      "4": ["09:15", "11:45", "14:15", "16:30"],
      "5": ["09:15", "12:00"],
      "6": []
    },

  // How often to get a server time offset in milliseconds
  "sync" : 3600000, (1 hour)

  // How soon to show the next Alarm in minutes
  "prewarn" : 5,

  // How long to show the alarm indicator in minutes
  "lightup" : 1
}

````