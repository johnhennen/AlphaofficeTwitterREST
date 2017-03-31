var http = require("http");
var fs = require("fs");
var queryString = require("querystring");
var fileVar = "./doc_root/SampleTweets.json";
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
    response.write("{ \"tweets\" : [");  
/*********************************************************    
UNCOMMENT THE CODE SECTION BELOW FOR THE WORKSHOP - THIS SECTION ASSEMBLES AND RETURNS THE TWITTER DATA FOR ALL TWEETS THAT COMPLY WITH THE HASHTAG FILTER.      
*********************************************************/
    /*
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
    response.write("]}");        
    response.end();
}).listen(8003);





 
