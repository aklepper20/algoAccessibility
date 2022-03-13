/* Class representing a Trie data structure */
export default class Trie {
  /**
   * Creates a Trie
   * @return {Object} Trie
   */
  constructor() {
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
  }

  /**
   * Insert a string into the Trie
   * @param  {String} str String to add
   * @param  {Number} pos Optional position in Trie
   * @return {}
   */
  insert(str, pos = 0) {
    //if there is no string, set end to true
    if (str.length === pos) {
      this.end = true;
      return;
    }
    //create a single letter variable
    let key = [str[pos]];
    //check if cur trie has key child, if no, create it
    if (!this.children[key]) {
      this.children[key] = new Trie();
    }
    //pass the child to the insert function to create/find the next letter
    this.children[key].insert(str, pos + 1);
  }

  getAllWords(word = "", words = []) {
    //if an ending letter, push word to words array
    if (this.end) {
      words.push(word);
    }
    // compile the characters and pass to the next letter trie
    for (let key in this.children) {
      this.children[key].getAllWords(word + key, words);
    }
    //return the array
    return words;
  }
  // This function changes this.end = false
  remove(str, pos = 0) {
    if (pos === str.length) {
      this.end = false;
    }
    if (str.length === 0 || this === undefined) return;
    let key = str[pos];
    let child = this.children[key];
    if (child) {
      child.remove(str, pos + 1);
    }
  }

  /**
   * Returns the autoComplete object
   * @param  {String} str String to search for
   * @param  {Number} pos Optional position
   * @return {Object} Returns an object where prev is the current string that is
   * being searched and found is the array of matching words
   */
  autoComplete(str, pos = 0) {
    // returns an autoComplete object
    //{prev: "ca" , found: ["car,cat"]}
    //use getAllWords for .found
    //Base case 1
    if (str.length === 0) {
      return {};
    }
    const key = str[pos];

    const child = this.children[key];

    if (child === undefined) {
      return {};
    }
    if (pos === str.length - 1) {
      return { prev: str, found: child.getAllWords(str) };
    }
    return child.autoComplete(str, pos + 1);
  }
}
