rfid-process-tracker
====================

Uses different RFID readers to track RFID-tagged items through a process.

This is a basic logistical application– anything RFID tagged that you want to track through a process, such as receiving, counting, and shipping packages, or putting items in inventory, placing them, selling them.

It's extremely simple; RFID readers tagged to represent a step of the process log RFID reads (tagged by RFID UID and the reader's process step) to Keen. Keen timestamps the read and provides an API to access and organize the data logs.

This is set up to create a new event collection in Keen for each new RFID tag. So if you want to track the history of a given item, you just look at the event stream for that UID.

## Materials

* [Tessel](//tessel.io) - ideally more than one, to get the full effect
* [RFID Module](//tessel.io/modules#module-rfid) - as many as you have Tessels
* RFID cards– one comes with the RFID module, but this will be more interesting if you have several handy. Transit cards usually work.

## Setup

1. Get a [Keen](//keen.io) account and make a new project.
1. Clone this repo and `npm install` to install dependencies.
1. Make a config.json file based on example-config.json, using the API keys from your Keen project.
1. Define what step you want each reader to represent. For each Tessel/step in the process, you should use a different step name in index.js
1. Plug the RFID Module into Tessel's port A
1. Make sure [Tessel is connected to wifi](//start.tessel.io/wifi), then push the code to Tessel with `tessel push index.js` (to do this in debug mode and get console.logs, just `tessel run index.js` instead)
1. Plug your Tessel into an alternate power source [like so](//tessel.io/docs/untethered) and wait for the blue light on its LED panel to turn on to show that it's ready. (Yellow should also be on to show that it's connected to wifi.)
1. Repeat previous steps for as many RFID readers/Tessels as you want to use
1. Tap RFID tagged things on RFID readers and watch the events show up in your Keen project
