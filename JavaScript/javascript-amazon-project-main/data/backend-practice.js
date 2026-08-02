const message = new XMLHttpRequest(); //built in class by JS

message.addEventListener('load',()=>{ //load -> responce loaded!
  console.log(message.response);
}); //(event,function to load)

message.open('GET', 'https://supersimplebackend.dev/products/first'); //(request,URL).Changing URL Paths (.dev'/...URL Path') gives diff response

//unsupported (not placed) paths give error like this:
/*
'request' 'URL' 'status-code' 'file-name.js'
Here, status code can start with 4** (our problem) or 5** (backend problem)
as responce failed. For successful responce, starts with 2**
*/

//We can go to doc page to see supported URLS' (https://supersimplebackend.dev/documentation)

//Supported URL paths are called Backend API (App. Prog. Interface)

//responce datatype can be text,JSON,HTML,image... (can be seen in Network Tab) (HTML and image in text in console and Media in Browser)
//JSON.parse() -> JS Obj of JSON file

//using browser address bar -> same as 'GET' request


message.send(); //backend recieves and sends responce (after this then eventListener runs)

//message.response ---> async code and undefined at start due to delay of backend responce


// So , this is Request-Responce Cycle

//HTTP = HyperText Transfer Protocol
//URL = Uniform Resource Locator

// The 's' in 'https' is for secure

