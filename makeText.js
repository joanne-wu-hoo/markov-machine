/** Command-line tool to generate Markov text. */

// required modules
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov.js')

 
// get command line inputs
const inputType = process.argv[process.argv.length-2]; // file or URL
const input = process.argv[process.argv.length-1]; // file name or URL


function processInput(inputType, input){
    if (inputType === "url"){
        processUrl(input);
    } 

    if (inputType === "file"){
        processText(input);
    } 
}

/** Given file path
 * - obtain file contents, 
 * - create Markov Machine, and 
 * - generate random text */
function processText(filePath){
    fs.readFile(filePath, 'utf8', function(err, data){
        if (err){
            console.log(`Error reading ${filePath}:`);
            console.log(`${err}`);
            process.exit(1);
        }
        let mm = new MarkovMachine(data);
        console.log(mm.makeText(numWords=50));
    })

}

/** Given URL
 * - obtain webpage contents, 
 * - create Markov Machine, and 
 * - generate random text */
function processUrl(inputUrl){ 
    axios
        .get(inputUrl)
        .then(function(resp){ 
            let mm = new MarkovMachine(resp.data);
            console.log(mm.makeText(numWords=50));
        })
        .catch(function(err){
            console.log(`Error reading ${inputUrl}:`);
            console.log(`${err}`);
            process.exit(1);
        })
}



module.exports = {
    processInput : processInput,
    processText : processText,
    processUrl : processUrl,
    fs : fs,
    axios : axios,
    inputType : inputType,
    input : input
  };