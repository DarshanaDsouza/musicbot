// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const google = require('googleapis');
const sampleClient = require('../sampleclient');

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: sampleClient.oAuth2Client
});

 const searchq = process.argv[2];

// a very simple example of searching for youtube videos
function runSamples()  {
  var resultarr = [];	
  console.log('pass variable', searchq);

  youtube.search.list({
    part: 'id,snippet',
    q: searchq,
    maxResults: '10'	  
  }, (err, data) => {
    if (err) {
      throw err;
    }
   	  
    //var results = data.items;
    for (var i = 0 ; i < data.data.items.length; i++)
       {  //console.log('b4 2nd loop ', data.data.items[i].id.videoId, " Tittle: ", data.data.items[i].snippet.title, "Thumbnails:", data.data.items[i].snippet.thumbnails);
	  resultarr.push("videoid:" , data.data.items[i].id.videoId, " Title: ", data.data.items[i].snippet.title, "Thumbnails:", data.data.items[i].snippet.thumbnails);
       }

    //console.log(data.data.items);
    console.log(JSON.stringify(resultarr));
    return resultarr;	  
    process.exit();
  });
}

const scopes = [
  'https://www.googleapis.com/auth/youtube'
];

sampleClient.authenticate(scopes, err => {
  if (err) {
    throw err;
  }
 
  runSamples();
});
