'use strict';
// Algorithm requirements
// Given a list of questions(WORDS) with corresponding "memory values", M, starting at 1:
// Take the first question in the list
// Ask the question
// If the answer was correct:
// Double the value of M
// Else, if the answer was wrong:
// Reset M to 1
// Move the question back M places in the list
// Use a singly linked list to do this

//1st time
// INPUT: arr (words) (with word to ask at the head)
// right answer
// OUTPUT: arr (words) (with word after words with MV of 1)

// head
// node {value, ptr: nextNode} -> node {value, ptr: nextNode} -> node {value, ptr: nextNode} -> null

const LinkedList = require('./SLL/LinkedList');

const sll = new LinkedList();
//sll.insertFirst({translation: 'fish', M: 2});
sll.insertFirst({translation: 'dog', M: 1});
// sll.insertFirst({translation: 'cat', M: 1});
sll.insertFirst({translation: 'cow', M: 1});

function spacedRepititon(sll, answer) {
  const word = sll.head;
  let nextWord = word.next;
  if(answer === word.value.translation) {
    word.value.M = word.value.M * 2;
  } else {
    word.value.M = 1;
  }
//        1 -> 1 -> 1 -> 2 -> 2 -> 3 -> 3 -> null 
  // while we arent at the end of the LL
  // and our M is greater than the nextWord M
  // increment 'node'
  while(nextWord !== null && word.value.M > nextWord.value.M) {
    //increment nextWord
    //console.log(nextWord);
    nextWord = nextWord.next;
  }
  //insert
  sll.remove(word);

  if(nextWord === null){
    // we have to cut the head off, make head.next the new head
    // and move the head to the new position instead of doing .remove / .insertlast / .insertbefore etc
    sll.insertLast(word.value);
  } else {
    sll.insertBefore(word.value, nextWord);
  }
  
  //return sll;
  return word;
}
console.log(spacedRepititon(sll, 'cow'));

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