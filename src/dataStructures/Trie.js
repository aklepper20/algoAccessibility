export default class Trie {
  constructor() {
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
  }

  insert(str, pos = 0) {
    if (str.length === pos) {
      this.end = true;
      return;
    }

    let key = [str[pos]];

    if (!this.children[key]) {
      this.children[key] = new Trie();
    }

    this.children[key].insert(str, pos + 1);
  }

  getAllWords(word = "", words = []) {
    if (this.end) {
      words.push(word);
    }

    for (let key in this.children) {
      this.children[key].getAllWords(word + key, words);
    }

    return words;
  }

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

  autoComplete(str, pos = 0) {
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
