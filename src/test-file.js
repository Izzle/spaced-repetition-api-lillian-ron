const LanguageService = require('./language/language-service');

const lang = {
  id: 2,
  user_id: 7,
  total_score: 8,
  head: 1
};

const words = [
  {
    id: 1,
    original: 'boo',
    translation: 'cat',
    memory_value: 2,
    correct_count: 0,
    incorrect_count: 0,
    language_id: 2,
    next: 2
  },
  {
    id: 2,
    original: 'dboo',
    translation: 'fish',
    memory_value: 1,
    correct_count: 0,
    incorrect_count: 0,
    language_id: 2,
    next: 3
  },
  {
    id: 3,
    original: 'bonnnnnnnnnnnno',
    translation: 'spidermonkey',
    memory_value: 1,
    correct_count: 0,
    incorrect_count: 0,
    language_id: 2,
    next: 4
  },
  {
    id: 4,
    original: 'bofsdfo',
    translation: 'dog',
    memory_value: 2,
    correct_count: 0,
    incorrect_count: 0,
    language_id: 2,
    next: 5
  },
  {
    id: 5,
    original: 'bofffo',
    translation: 'cow',
    memory_value: 4,
    correct_count: 0,
    incorrect_count: 0,
    language_id: 2,
    next: null
  }
];

const SLL = LanguageService.createLinkedList(lang, words);

function display(SLL) {
  while(SLL.head !== null){
    console.log(SLL.head.value);
    SLL.head = SLL.head.next;
  }
}

//display(SLL);
const modifiedSLL = SLL.moveHead(2);
display(modifiedSLL);
//console.log(SLL.moveHead(2));