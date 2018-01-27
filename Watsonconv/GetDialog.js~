

var prompt = require('prompt-sync')();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var youtube = require('../Youtubebot/Youtube/searchbot.js');

// Set up Conversation service.
var conversation = new ConversationV1({
  username: 'b1b0a4de-121c-4c3c-80f7-4ca29bc0b181', // replace with username from service key
  password: '6vRV8P8GeQio', // replace with password from service key
  version_date: '2017-05-26'
});

var params = {workspace_id:'da356020-08ea-4d5e-89fd-16d76d63de6e',};

// Start conversation with empty message.
conversation.message(params, processResponse);

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
		 console.log(response.input.text)
		 //youtube.getplaylist(response.input.text).then(function(jsonstr){
		//	 response.ouptput.text=jsonstr
		//	 console.log(jsonstr);
		 var jsonstr = JSON.stringify(youtube.getplaylist(response.input.text));
		 console.log(jsonstr);
		 //youtube.playlist(response.input.text, function(jsonstr){
		//	 console.log(jsonstr);})
		 
		 }
		 //console.log("call api")
		
      else
          if (response.input.text=="exit")
	 {
		 process.exit
	 }
      else 
      console.log(response.output.text[0]);
  }

  // Prompt for the next round of input.
    var newMessageFromUser = prompt('>> ');
    // Send back the context to maintain state.
    conversation.message({
      workspace_id:'da356020-08ea-4d5e-89fd-16d76d63de6e',	    
      input: { text: newMessageFromUser },
      context : response.context,
    }, processResponse)
}
