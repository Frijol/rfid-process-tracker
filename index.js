// This goes on each Tessel in the process
// Give each step in the process a unique name:
// var thisStep = 'Received';
var thisStep = 'Counted';
// var thisStep = 'Shipped';

console.log('Setting up, please wait...');

var Keen = require('keen.io');

// Configuration
var config = require('./config.json');

// Set up hardware
var tessel = require('tessel');
var rfid = require('rfid-pn532').use(tessel.port['A']);

// Set up event streaming
console.log("Setting up Keen...");
var keen = Keen.configure({
  projectId: config.projectId,
  writeKey: config.writeKey,
  readKey: config.readKey
});

// When RFID reader is ready to read cards
rfid.on('ready', function () {
  // Notify user
  tessel.led[1].output(1);
  console.log('RFID reader ready and waiting.');
});

// When RFID card sensed
rfid.on('data', function (data) {
  // Log the data
  sendData({uid: data.uid, step: thisStep});
});

// Sending data to Keen
function sendData (data) {
  console.log(data.uid.toString('hex'));
  keen.addEvent(data.uid.toString('hex'), {data: data}, function () {
    console.log("Added event #" + count, "data: ", data);
  });
}
