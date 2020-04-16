'use strict';
// each entry in 'word' table is a node
//   our node.next is word.next
//   our node.value is everything in word except word.next (which will change)
// the head of our linked-list is language.head (in the language table as head:word.id)

// TA NOTES:
// USE  THE DATABASE to implement a Linked List "shape"
// so instead of using our LinkedList class with its this.head
// use the Language -> head to find the 'head' your 'linked list'
// 
// To move the head M places down:

// Remove the head node from the list
// Find the node to insert after
// Change ex-head 'next' to be insert-after 'next'
// Change insert-after 'next' to be ex-head
// language.head = word.next

//need:
//A way to change the head
//A way to change pointers
//

//! Each _Node is a single 'word' entry in our db
class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

//! What gives our LinkedList structure is the relationship between the
//! 'word' table (nodes) and the 'language' table (linked list)
class LinkedList {
  //! NOTE: We don't take the head from 'language.head', that is because
  //! language.head is keeping track of the starting point of the head
  //! but we need our 'head' to start at null
  constructor(id, user_id, total_score) {
    this.id = id;
    this.user_id = user_id;
    this.total_score = total_score;
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
  /**
   * Assuming our Linked List has a sorted value, this will move the head
   * to its new sorted position and make head.next the new head
   * @param {integer} memoryValue the value to sort by //*(e.g. memory_value)
   */

  // To move the head M places down:

  // Remove the head node from the list
  // Find the node to insert after
  // Change ex-head 'next' to be insert-after 'next'
  // Change insert-after 'next' to be ex-head
  // language.head = word.next
  moveHead(memoryValue){
    let newHeadNode = this.head.next;
    let oldHeadNode = this._findSortedPosition(memoryValue);
    this.head.next = oldHeadNode.next;
    oldHeadNode.next = this.head;
    this.head = newHeadNode;
    //return [newHeadNode, oldHeadNode];
    return newHeadNode;

    // let newHeadNode = this.head.next;
    // let oldHeadNode = this._findSortedPosition(memoryValue);
    // this.head.next = 'temp';

  }

  //! Test this to see if the bracket notation is working
  // TODO: TEST
  _findSortedPosition(memoryValue){
    let node = this.head;
    while(node.next !== null && node.value.memory_value > memoryValue) {
      node = node.next;
    }
    return node;
  }
}


module.exports = LinkedList;