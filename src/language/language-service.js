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
      .from('word AS w')
      .leftJoin('language AS l', 'l.user_id', user_id)
      .select(
        'w.original',
        'w.correct_count',
        'w.incorrect_count',
        'l.total_score'
      )
      .where({ language_id })
      .first();
  },

  getLanguageHead(){},

  createLinkedList(language, words) {
    const SLL = new LinkedList(
      language.id,
      language.user_id,
      language.total_score
    );
    // language has a 'head' property and words has a 'next'
    let word = { next: language.head };
    // every language is saved like a linked list in the DB so there will be a null at the end
    while(word.next !== null) {
      word = words.find(word => word.next === word.id);
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