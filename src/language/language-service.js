'use strict';
const LinkedList = require('../SLL/LinkedList');

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id });
  },

  getLanguageWord(db, language_id, user_id) {
    return db

    // return db.raw(`SELECT original, correct_count, incorrect_count, total_score
    //     FROM word w 
    //     JOIN "language" l 
    //     ON w.language_id = l.id
    //     WHERE w.id = ${head};`
    // );
    // TODO: test that this works after we can change the data
      .from('word AS w')
      .where('w.language_id', language_id)
      .innerJoin('language AS l', 'l.head', 'w.id')
      .select(
        'w.original',
        'w.correct_count',
        'w.incorrect_count',
        'l.total_score'
      )
      .first();
  },

  getLanguageHead(){},

  /**
   * 
   * @param {*} db knex instance
   * @param {interger} id language.id
   * @param {string} head language.head
   */
  updateLanguageHead(db, id, head){
    return db('language').where({ id }).update({ head });
  },
  
  /**
   * 
   * @param {*} db knex instance
   * @param {*} id language.id or word.language_id
   * @param {*} total_score 
   */
  updateTotalScore(db, id, total_score){
    return db('language').where({ id }).update({ total_score });
  },

  updateWords(db, list) {
    return db.transaction(trx => {
      const queries = []
      let currentWord = list.head
      while(currentWord !== null) {
      // let currentNext = currentWord.next
        const query = db('word')
          .where('id', currentWord.value.id)
          .update({
            memory_value: currentWord.value.memory_value,
            correct_count: currentWord.value.correct_count,
            incorrect_count: currentWord.value.incorrect_count,
            next: currentWord.next ? currentWord.next.value.id : null,
          })
          .transacting(trx) // this makes every update be in the same transaction
        queries.push(query)
        currentWord = currentWord.next
      } 

      Promise.all(queries)
        .then(trx.commit)
        .catch(trx.rollback)
    })
  },
  
  createLinkedList(language, words) {
    const SLL = new LinkedList();
    // language has a 'head' property and words has a 'next'
    let word = { next: language.head };
    // every language is saved like a linked list in the DB so there will be a null at the end
    while(word.next) {
      word = words.find(w => w.id === word.next);
      // We use insertLast to keep them in order, since we will want to have them sorted by memory_value
      SLL.insertLast({
        id: word.id,
        original: word.original,
        translation: word.translation,
        memory_value: word.memory_value,
        correct_count: word.correct_count,
        incorrect_count: word.incorrect_count
      });
    }
    return SLL;
  }

};

module.exports = LanguageService;