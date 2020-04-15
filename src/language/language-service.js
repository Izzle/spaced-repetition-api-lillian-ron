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

  createLinkedList(language, word) {
    const SLL = new LinkedList(
      language.id,
      language.name,
      language.total_score,
      language.user_id
    );
  }
};

module.exports = LanguageService;