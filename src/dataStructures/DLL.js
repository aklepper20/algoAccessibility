export class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
    this.prev = null;
  }
}

export default class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    if (this.length == 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
      node.prev = this.tail;
    }
    this.length++;
  }

  getNodeAtIndex(index) {
    let counter = 0;
    let current = this.head;

    while (counter < index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  insertAtIndex(index, val) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      return this.unshift(val);
    }
    if (index === this.length) {
      return this.push(val);
    }
    const newNode = new Node(val);
    const after = this.getNodeAtIndex(index);
    const before = this.getNodeAtIndex(index - 1);
    newNode.next = after;
    before.next = newNode;

    this.length++;
    return this;
  }

  removeAtIndex(index) {
    if (index < 0 || index >= this.length) {
      return false;
    }
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const before = this.getNodeAtIndex(index - 1);
    const removedNode = this.getNodeAtIndex(index);
    before.next = removedNode.next;
    removedNode.next = null;

    this.length--;
    return removedNode;
  }
}
