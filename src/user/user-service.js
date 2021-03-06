const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UserService = {
  hasUserWithUserName(db, username) {
    return db('user')
      .where({ username })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('user')
      .returning('*')
      .then(([user]) => user)
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    }
  },
  populateUserWords(db, user_id) {
    return db.transaction(async trx => {
      const [languageId] = await trx
        .into('language')
        .insert([
          { name: 'Japanese', user_id },
        ], ['id'])

      // when inserting words,
      // we need to know the current sequence number
      // so that we can set the `next` field of the linked language
      const seq = await db
        .from('word_id_seq')
        .select('last_value')
        .first()
      
      // note: you should be able to easily get the values for each array if you
      // inspect the seed file, for the INSERT INTO 'word' VALUES section, it is
      // the last 3 entries (x, x, "original", "translation", "next")
      const languageWords = [
        ['あ', 'a', 2],
        ['い', 'i', 3],
        ['う', 'u', 4],
        ['え', 'e', 5],
        ['お', 'o', 6],
        ['か', 'ka', 7],
        ['き', 'ki', 8],
        ['く', 'ku', 9],
        ['け', 'ke', 10],
        ['こ', 'ko', 11],
        ['さ', 'sa', 12],
        ['し', 'shi', 13],
        ['す', 'su', 14],
        ['せ', 'se', 15],
        ['そ', 'so', 16],
        ['た', 'ta', 17],
        ['ち', 'chi', 18],
        ['つ', 'tsu', 19],
        ['て', 'te', 20],
        [ 'と', 'to', 21],
        ['な', 'na', 22],
        ['に', 'ni', 23],
        ['ぬ', 'nu', 24],
        ['ね', 'ne', 25],
        ['の', 'no', null]
      ]

      const [languageHeadId] = await trx
        .into('word')
        .insert(
          languageWords.map(([original, translation, nextInc]) => ({
            language_id: languageId.id,
            original,
            translation,
            next: nextInc
              ? Number(seq.last_value) + nextInc
              : null
          })),
          ['id']
        )

      await trx('language')
        .where('id', languageId.id)
        .update({
          head: languageHeadId.id,
        })
    })
  },
}

module.exports = UserService
