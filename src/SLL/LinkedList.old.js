'use strict';

// each entry in 'word' table is a node
//   our node.next is word.next
//   our node.value is everything in word except word.next (which will change)
// the head of our linked-list is language.head (in the language table as head:word.id)

//language.head = word.next

//need:
  //A way to change the head
  //A way to change pointers
  //





//ignore for now
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(user_id, ) {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) {
    // start at the head
    let currentNode = this.head;
    // if the list is empty
    if (!this.head) {
      return null;
    }
    // check for the item
    while (currentNode.value !== item) {
      // return null if it's the end of the list and the item is not on the list
      if (currentNode.next === null) {
        return null;
      } else {
        // otherwise, keep looking
        currentNode = currentNode.next;
      }
    }
    // found it
    return currentNode;
  }

  remove(item) {
    // if the list is empty
    if (!this.head) {
      return null;
    }
    // if the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // start at the head
    let currentNode = this.head;
    // keep track of previous
    let previousNode = this.head;

    while (currentNode !== null && currentNode.value !== item) {
      // save the previous node
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currentNode.next;
  }

  insertBefore(item, nextItem) {
    // if the list is empty
    if (!this.head) {
      this.insertFirst(item);
    }

    //finds the spot where the next node === the value of nextItem
    let tempNode = this.head;
    let previousNode = this.head;
    while (tempNode.next.value !== nextItem) {
      previousNode = tempNode;
      tempNode = tempNode.next;
    }
    previousNode.next = new _Node(item, tempNode.next);
  }

  insertAfter(item, prevItem) {
    // if the list is empty
    if (!this.head) {
      this.insertFirst(item);
    }

    //finds where previous value is the previous item, sets the previous pointer to a new node with the old previous pointer used in the new node
    let nextNode = this.head;
    let previousNode = this.head;
    while (previousNode.value !== prevItem) {
      previousNode = nextNode;
      nextNode = previousNode.next;
    }
    previousNode.next = new _Node(item, previousNode.next);
  }

  insertAt(item, index) {
    //if you're inserting at the front
    if (index === 0) {
      this.insertFirst(item);
    }

    /* while you're in a valid node, check to see if it's the position before index, then point to new node, which points at old node's pointer */

    let currentNode = this.head;
    let i = 0;
    while (currentNode !== null && i < index - 1) {
      currentNode = currentNode.next;
      i++;
    }
    if (currentNode === null) {
      return undefined;
    } else {
      currentNode.next = new _Node(item, currentNode.next);
    }
  }
}

// module.exports = LinkedList;