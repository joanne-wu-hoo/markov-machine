const { MarkovMachine } = require('./markov.js')
const {processInput,
       processText,
       processUrl,
       fs,
       axios,
       inputType,
       input} = require('./makeText.js')

// mock console log
let logged = [];

function pretendLog(msg) {
    logged.push(msg);
    return logged;
}

console.log = pretendLog;

// test markov machine test suite
describe("test markov machine", function () {

    beforeEach(function(){
        logged = [];  
    })

    test('correctly processes file', function() {
        let file = "./file.txt"
        processText(file);

        expect(logged).toContain("This is a file");
    });


});

// sudo chown -R Joanne /usr/local/lib/node_modules

