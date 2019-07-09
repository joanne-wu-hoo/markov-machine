const { MarkovMachine } = require('./markov.js')

describe("test markov machine", function () {

    let mm;

    beforeAll(function(){
        mm = new MarkovMachine("the cat in the hat")    
    })

    test('correctly parses input text', function() {
      expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
    });
  
    test('correctly creates markov chains', function () {
      expect(mm.markovChains).toEqual({
          "the": ["cat", "hat"],
          "cat": ["in"],
          "in": ["the"],
          "hat": [null]
      });
    });

    test('correctly generates next word', function() {
        expect(mm.generateNextWord("cat")).toEqual("in");
    });
    
    test('correctly generates markov text', function() {
        let markovText = mm.makeText(numWords=50);
        let markovTextArr = markovText.split(" ");
        let textLength = markovTextArr.length;
        let lastWord = markovTextArr[textLength-1];
        
        // if markov text < 50, make sure last word is hat 
        // if markov text is 50, then last word does not need to be hat
        
        expect(lastWord).toEqual("hat");
        expect(textLength).toBeLessThan(50);   
    }); 
    
  });