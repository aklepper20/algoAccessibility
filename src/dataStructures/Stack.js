import Header from "../components/Header";

class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }

  push(value) {
    this.data[this.top] = value;
    this.top++;
  }

  pop() {
    if (this.data.length == 0) {
      console.log("Nothing to pop!");
      return;
    } else {
      this.top--;
      return this.data.pop();
    }
  }

  getLength() {
    console.log(this.data.length);
  }

  isEmpty() {
    if (this.data.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
const undo = new Stack();
const redo = new Stack();

const stackComplete = (ev) => {
  let editor = document.getElementById("editor");

  if (ev.metaKey) {
    if (ev.key === "u") {
      ev.preventDefault();
      redo.push(undo.pop());
      editor.value = undo.data.join("");
    } else if (ev.key === "r") {
      ev.preventDefault();
      undo.push(redo.pop());
      editor.value = undo.data.join("");
    }
  } else {
    undo.push(ev.key);
  }
};

export default stackComplete;
