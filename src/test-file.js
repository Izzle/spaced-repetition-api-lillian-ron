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
    translation: 'hoo',
    memory_value: 2,
    correct_count: 0,
    incorrect_count: 0
  },
  {
    id: 2,
    original: 'dboo',
    translation: 'dhoo',
    memory_value: 1,
    correct_count: 0,
    incorrect_count: 0
  },
  {
    id: 3,
    original: 'bonnnnnnnnnnnno',
    translation: 'hnnaoo',
    memory_value: 1,
    correct_count: 0,
    incorrect_count: 0
  },
  {
    id: 4,
    original: 'bofsdfo',
    translation: 'hobbbbnno',
    memory_value: 2,
    correct_count: 0,
    incorrect_count: 0
  },
  {
    id: 5,
    original: 'bofffo',
    translation: 'hoofffff',
    memory_value: 4,
    correct_count: 0,
    incorrect_count: 0
  }
];

const result = LanguageService.createLinkedList(lang, words);
console.log(result);