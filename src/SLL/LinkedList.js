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
  constructor() {
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

  /**Inserts a new node after a node containing the key.*/
  insertAfter(key, itemToInsert){
    let tempNode = this.head;
    while(tempNode !== null && tempNode.value !== key){
      tempNode = tempNode.next;
    } 
    if(tempNode !== null){
      tempNode.next = new _Node(itemToInsert, tempNode.next);
    }  
  }

  /* Inserts a new node before a node containing the key.*/
  insertBefore(key, itemToInsert){
    if(this.head == null){
      return;
    }
    if(this.head.value == key){
      this.insertFirst(itemToInsert);
      return;
    }
    let prevNode = null;
    let currNode = this.head;
    while(currNode !== null && currNode.value !== key){
      prevNode = currNode;
      currNode = currNode.next;
    }
    if(currNode === null){
      console.log('Node not found to insert');
      return;
    }
    //insert between current and previous
    prevNode.next = new _Node(itemToInsert, currNode);
  }

  insertAt(nthPosition, itemToInsert) {
    if (nthPosition < 0) {
      throw new Error('Position error');
    }
    if (nthPosition === 0) {
      this.insertFirst(itemToInsert);
    }else {
      // Find the node which we want to insert after
      const node = this._findNthElement(nthPosition - 1);
      const newNode = new _Node(itemToInsert, null);
      newNode.next = node.next; 
      node.next = newNode;
    }
  }

  _findNthElement(position) {
    let node = this.head;
    for (let i=0; i<position; i++) {
      node = node.next;
    }
    return node;
  }

  remove(item){ 
    //if the list is empty
    if (!this.head){
      return null;
    }
    //if the node to be removed is head, make the next node head
    if(this.head.value === item){
      this.head = this.head.next;
      return;
    }
    //start at the head
    let currNode = this.head;
    //keep track of previous
    let previousNode = this.head;
    while ((currNode !== null) && (currNode.value !== item)) {
      //save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if(currNode === null){
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
  
  find(item) { //get
    //start at the head
    let currNode = this.head;
    //if the list is empty
    if (!this.head){
      return null;
    }
    while(currNode.value !== item) {
      //return null if end of the list 
      // and the item is not on the list
      if (currNode.next === null) {
        return null;
      }
      else {
        //keep looking 
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }
  // To move the head M places down:

  // Remove the head node from the list
  // Find the node to insert after (where head node should be inserted)
  // Change ex-head 'next' to be insert-after 'next' (head.next = insertAfter.next)
  // Change insert-after 'next' to be ex-head        (insertAfter.next = head)
  // language.head = word.next    (make the new head the head.next)
  moveHead(memoryValue){
    // save the originalHead
    let originalHead = this.head;
    // remove the head
    this.remove(this.head.value);
    // Move the head back 'M'(memory_value) places in the list
    let tempNode = this.head;
    while(tempNode !== null && tempNode.value.memory_value !== memoryValue){
      tempNode = tempNode.next;
    } 
    if(tempNode !== null){
      tempNode.next = new _Node(originalHead.value, tempNode.next);
    }
    this.insertLast(originalHead.value);
  }

  // Displays the LinkedList in the console
  display() {
    while(this.head !== null){
      console.log(this.head.value);
      this.head = this.head.next;
    }
  }
}


module.exports = LinkedList;