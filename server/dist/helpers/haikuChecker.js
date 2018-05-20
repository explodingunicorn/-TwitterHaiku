"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rita = require("rita");
class HaikuChecker {
    constructor(text) {
        this.haikuSplit = [];
        this.haiku = '';
        const trimmedText = new rita.RiString(text).trim()._text;
        this.textArray = trimmedText.split(' ');
    }
    check() {
        //Check that the tweet is atleast 3 words long
        if (this.textArray.length > 2) {
            //Now check for all of the syllables needed for a haiku
            if (this.checkForSyllables(5) && this.checkForSyllables(7) && this.checkForSyllables(5)) {
                if (this.textArray.length === 0) {
                    return {
                        split: this.haikuSplit,
                        haiku: this.haiku
                    };
                }
                return;
            }
            return;
        }
        return;
    }
    checkForSyllables(syllables) {
        let syllableCount = 0;
        let sentence = '';
        let wordCount = 0;
        for (let i = 0; i < this.textArray.length; i++) {
            const word = this.textArray[i];
            //Add syllables of the word to the syllable count
            syllableCount += rita.getSyllables(word.replace("'", '')).split('/').length;
            //Shift the text array removing the word
            //Add the word to the sentence
            sentence += (word + ' ');
            wordCount++;
            //If we have successfully hit our syllable count then push the sentence to our haiku split
            if (syllableCount === syllables) {
                this.haikuSplit.push(sentence);
                this.haiku += sentence;
                //Remove the words that we just counted
                this.textArray.splice(0, wordCount);
                return true;
            }
            else if (syllableCount > syllables) {
                return false;
            }
        }
    }
}
exports.default = HaikuChecker;
