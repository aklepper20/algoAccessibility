export default class Stack {
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
