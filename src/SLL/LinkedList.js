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
//language.head = word.next

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
  //? Implementation 1: 'typical' linked list class
  //! NOTE: We don't take the head from 'language.head', that is because
  //! language.head is keeping track of the starting point of the head
  //! but we need our 'head' to start at null
  //!   ITS IMPORTANT TO HAVE A PROJECT IN OUR PORTFOLIOS THAT SHOW EMPLOYERS
  //!   WE KNOW HOW TO WORK WITH LINKED LISTS. So this method is probably the way to go
  //!   even though its not ideal
  //! We should use our LinkedList class to immitate the DB
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
   * @param {number} n the value to sort by //
   */
  moveHead(n){
    let newHeadNode = this.head.next;
    let oldHeadNode = 
  }

  _findNewPosition(n){

  }
}


module.exports = LinkedList;