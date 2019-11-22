const zlib = require('zlib');
var FinalStatus = "";
const url = require('url');
const https = require('https');

const hookUrl = process.env.slackchannel_url;
const slackChannel = process.env.slackChannel;
const conncount = 10;

function postMessage(message, callback) {
    const body = JSON.stringify(message);
    const options = url.parse(hookUrl);
    options.method = 'POST';
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    };

    const postReq = https.request(options, (res) => {
        const chunks = [];
        res.setEncoding('utf8');
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
            if (callback) {
                callback({
                    body: chunks.join(''),
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                });
            }
        });
        return res;
    });

    postReq.write(body);
    postReq.end();
}


function getstatusdetails(obj) {
 var connectioncountstring ="";
  connectioncount=0;
 var data = JSON.parse(obj)
 console.log("logevents ", data.logGroup)
 console.log("loggroups ", data.logStream)
 for (var msg in data.logEvents) {

  if (data.logEvents[msg].message.includes("sessions")) {
   connectioncountstring = data.logEvents[msg].message.split(',')[2];
   connectioncount = connectioncountstring.split(':')[1];
   if (connectioncount > conncount){
     FinalStatus = FinalStatus + data.logEvents[msg].message + '\n';
   }
  }
 }
}



exports.handler = (event, context, callback) => {
    const payload = new Buffer(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    console.log('Decoded payload:', JSON.stringify(parsed));
    getstatusdetails(JSON.stringify(parsed));

    if ( FinalStatus != "") {
         FinalStatus = " <!here>" + " \n Informix Session Count Alert \n " + FinalStatus + " \n "
         var slackMessage = {
            channel: slackChannel,
            text:  `${FinalStatus}`,
        }
    postMessage(slackMessage, (response) => {
        if (response.statusCode < 400) {
            console.info('Message posted successfully');
            callback(null);
        } else if (response.statusCode < 500) {
            console.error(`Error posting message to Slack API: ${response.statusCode} - ${response.statusMessage}`);
            callback(null);  // Don't retry because the error is due to a problem with the request
        } else {
            // Let Lambda retry
            console.log(`Server error when processing message: ${response.statusCode} - ${response.statusMessage}`);
            callback(`Server error when processing message: ${response.statusCode} - ${response.statusMessage}`);
        }
    });        
 }
    return `Successfully processed ${parsed.logEvents.length} log events.`;
    

};
