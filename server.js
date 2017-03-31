var http = require("http");
var fs = require("fs");
var queryString = require("querystring");
var fileVar = "./doc_root/SampleTweets.json";
var uneditedVar = "\r\n      {\r\n         \"text\":\"THE WORKSHOP TWITTER MICROSERVICE SERVER.JS CODE HAS NOT BEEN EDITED.\",\r\n         \"" +
	"user\":{\r\n            \"screen_name\":\"**\"\r\n         },\r\n         \"entities\":{\r\n            " + 
	"\"hashtags\":[{\r\n               \"text\":\"**\"}]},\r\n         \"timestamp_ms\":\"0000000000000\"\r\n      }";
var jsonObj;

// READ UNFILTERED JSON FILE AND PARSE IT INTO A JSON OBJECT.
fs.readFile(fileVar, handleFile)
function handleFile(err, data) {
    if (err) throw err
    jsonObj = JSON.parse(data)
}

// GENERATE AND RETURN A JSON FILE FILTERED BY HASHTAG.
http.createServer(function(request, response) {
response.writeHead(200, {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Content-Type': 'application/json'
});
    // GET THE HASHTAG PARAMETER PASSED IN THE URL QUERY STRING.
    var queryVar = "ALL";
    if (request.url.indexOf('?' >= 0)) {
        var queryString =  request.url.substr(request.url.indexOf('?') + 1);
        queryString =  queryString.replace(/%23/g, "#");       
        var sURLVariables = queryString.split('&');
        var parameterString;
        for (i = 0; i < sURLVariables.length; i++) {
            parameterString = sURLVariables[i].split('=');
            if (parameterString[0] == "hashtag") { 
                queryVar = parameterString[1];
            }
        }       
    }
    // GENERATE RETURN JSON OBJECT.
    response.write("{\r\n   \"tweets\":[");  
    /*********************************************************    
    UNCOMMENT THE CODE SECTION BELOW FOR THE WORKSHOP - THIS SECTION ASSEMBLES AND RETURNS THE TWITTER DATA FOR ALL TWEETS THAT COMPLY WITH THE HASHTAG FILTER.      
    *********************************************************/
    /*
    uneditedVar = "";    
    var firstRow = true;
    for (var k in jsonObj.tweets) { 
      if (jsonObj.tweets[k].entities) {
        if (jsonObj.tweets[k].entities.hashtags[0]) { 
            if (jsonObj.tweets[k].entities.hashtags[0].text) {  
                // INCLUDE TWEET JSON OBJECT IN RETURN JSON OBJECT ONLY IF HASHTAG FILTER ALLOWS.            
                if ((jsonObj.tweets[k].entities.hashtags[0].text == queryVar)||(queryVar == "ALL")) { 
                    if  (!firstRow) {
                        response.write(",");        
                    } 
                    firstRow = false;                                      
                    response.write(JSON.stringify(jsonObj.tweets[k]) + "\r\n");
                }             
            } 
        }
      }
    }   
    */
    /*********************************************************    
    UNCOMMENT THE CODE SECTION ABOVE FOR THE WORKSHOP.    
    *********************************************************/  
    response.write(uneditedVar); // DOES NOTHING IF SECTION ABOVE IS UNCOMMENTED       
    response.write("\r\n   ]\r\n}");        
    response.end();
}).listen(8003);





 
