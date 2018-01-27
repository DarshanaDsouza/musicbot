'use strict';
//var express = require('express');
const google = require('googleapis');
const sampleClient = require('../sampleclient');
//var app = express();
// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

 //const searchq = process.argv[2];
const searchq = '';

var prompt = require('prompt-sync')();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
//var youtube = require('../Youtubebot/Youtube/searchbot.js');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: 'b1b0a4de-121c-4c3c-80f7-4ca29bc0b181', // replace with username from service key
  password: '6vRV8P8GeQio', // replace with password from service key
  version_date: '2017-05-26'
});

var params = {workspace_id:'da356020-08ea-4d5e-89fd-16d76d63de6e',};

// Start conversation with empty message.
conversation.message(params, processResponse);

//app.get('/', function (req, res) {
//  res.sendFile('index.html');
//});

// Process the conversation response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  // If an intent was detected, log it out to the console.
  if (response.intents.length > 0) {
    //console.log('Detected intent: #' + response.intents[0].intent);
  }

  // Display the output from dialog, if any.
  if (response.output.text.length != 0) {
      if (response.output.text[0]=="Sure. Will display results soon")
	 {
		 //console.log(response.input.text);
		 //var jsonstr = getplaylist(response.input.text);
		 //console.log(jsonstr);
		 getplaylist(response.input.text);
	 }
      else
          if (response.input.text=="exit")
	 {
		 process.exit
	 }
      else 
      console.log(response.output.text[0]);
  }

	var newMessageFromUser = prompt('>> ');
	//var newMessageFromUser = document.getElementById('InpTxt').value;
    // Send back the context to maintain state.
    conversation.message({
      workspace_id:'da356020-08ea-4d5e-89fd-16d76d63de6e',	    
      input: { text: newMessageFromUser },
      context : response.context,
    }, processResponse)


}

function getplaylist(searchq)
{
  var resultarr = [];	
  
  //console.log('pass variable', searchq);

  if (searchq) {
        //console.log('in if')

	youtube.search.list({
	    part: 'id,snippet',
	    q: searchq,
	    maxResults: '10'	  
	  }, (err, data) => {
	  if (err) {
      		throw err;
	    }	
   	  	
    
	   for (var i = 0 ; i < data.data.items.length; i++)
       		{  //console.log('b4 2nd loop ', data.data.items[i].id.videoId, " Tittle: ", data.data.items[i].snippet.title, "Thumbnails:", data.data.items[i].snippet.thumbnails);
		  resultarr.push("videoid:" , data.data.items[i].id.videoId, " Title: ", data.data.items[i].snippet.title, "Thumbnails:", data.data.items[i].snippet.thumbnails, "url:", "www.youtube.com/watch?v="+data.data.items[i].id.videoId);
		  //console.log('infor');
	       }	
	
	    //console.log(data.data.items);
		console.log(JSON.stringify(resultarr));
    		//return callback(resultarr);	  
	    	//process.exit();        
		});
             
  
  }
 else
	{console.log("enter search")
	//process.exit();
		}

}
	const scopes = [
		  'https://www.googleapis.com/auth/youtube'
		];

	sampleClient.authenticate(scopes, err => {
	  if (err) {
		  console.log("err");
   		 throw err;
 		 }
           //else 
	      //{	console.log("auth success");}
	})
	
//app.listen(5000);
  // Prompt for the next round of input.
  
