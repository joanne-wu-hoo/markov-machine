/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/ 
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markovChains = this.makeChains();
    this.lastWord = this.findLastWord();

  }

  /** set markov chains:
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    let markovChains = {};

    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i];

      if (markovChains[word] === undefined){
        // if markovChain object does NOT have word as key
        if (this.words[i+1] !== undefined){
          // if the word next to the target word is an actual word, add the word
          markovChains[word] = [this.words[i+1]];  
        } else {
          // if there isn't a word next to the target word, then fill in with null
          markovChains[word] = [null];
        }
      } else {
        // if markovChain object already has word as key
        if (this.words[i+1] !== undefined){
          // if the word next to the target word is an actual word, add the word
          markovChains[word].push(this.words[i+1]); 
        } else {
          // if there isn't a word next to the target word, then fill in with null
          markovChains[word].push(null); 
        }
      }
    }

    return markovChains;
  }

  /** find the word that leads to the termination state */
  findLastWord() {
    for (let word in this.markovChains){
      for (let value of this.markovChains[word]){
        if (value === null){
          return word;
        }
      }
    }
  }

  /** given the last word in the output string, return a word that leads to that state */
  generateNextWord(word){
    //let word = outputTextArr[outputTextArr.length-1];
    let randomIdx = getRandomInt(this.markovChains[word].length);
    let nextWord = this.markovChains[word][randomIdx];

    while (nextWord === null){
      randomIdx = getRandomInt(this.markovChains[word]);
      nextWord = this.markovChains[word][randomIdx];   
    }

    return nextWord;
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    let outputTextArr = [];
    let randomWordIdx = getRandomInt(Object.keys(this.markovChains).length);
    let randomWord = Object.keys(this.markovChains)[randomWordIdx];

    outputTextArr.push(randomWord);

    while (outputTextArr.length < numWords-1 && outputTextArr[outputTextArr.length-1] !== this.lastWord){
      // outputTextArr.push(this.generateNextWord(outputTextArr));
      let word = outputTextArr[outputTextArr.length-1];
      outputTextArr.push(this.generateNextWord(word));
    }

    return outputTextArr.join(' ');
  }
}

/* Generate a random integer */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// -------------------------------------------

// Export modules
module.exports = {
  MarkovMachine: MarkovMachine
};