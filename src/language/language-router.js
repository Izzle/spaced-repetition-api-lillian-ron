const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()
const jsonBodyParser = express.json()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const word = await LanguageService.getLanguageWord(
        req.app.get('db'),
        req.language.id,
        req.user.id,
      )

      res.json({
        nextWord: word.original,
        totalScore: word.total_score,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count,
      })

      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    // The users guess for what the answer is
    const { guess } = req.body

      if (guess == null) {
        return res.status(400).json({
            error: `Missing 'guess' in request body`
        })
      }

    try {
      words = await LanguageService.getLanguageWords(
          req.app.get('db'),
          req.language.id
      )

      const SLL = await LanguageService.createLinkedList(req.language, words)
      const answer = SLL.head.value.translation
      let { memory_value, correct_count, incorrect_count } = SLL.head.value
      let totalScore = req.language.total_score
      let isCorrect

      if(guess.toLowerCase() === answer.toLowerCase()) {
        memory_value *= 2
        correct_count++
        totalScore++
        isCorrect = true
      } else {
        memory_value = 1
        incorrect_count++
        isCorrect = false
      }
      //console.log(SLL.head.value.id)
      console.log(req.language.head)
     // SLL.display()
      // move head

      // save the new values to the head word in db 
      const updateHeadValues = {
        memory_value,
        correct_count,
        incorrect_count
      }
      LanguageService.setLanguageHeadWord(
          req.app.get('db'),
          req.language.id,
          updateHeadValues
      )
      // remove the head node from the SLL
      //   find where it should be inserted after (get the WORD ID)
      //   change the ex-head.next to be insert-afters.next
      //   change insert-afters.next to be ex-head
      // make the new head e.g. update language .head and total_score (language.head = word.next)


      // update head in language
      // update total_score in language (cant get total_score from SLL)
      // update memory_value in words
      // update correct_count or incorrect_count in words
      // update 'next' in words

    //! what our actual response should be
    //   res.status(200).json({
    //     nextWord: word.original,
    //     wordCorrectCount: word.correct_count,
    //     wordIncorrectCount: word.incorrect_count,
    //     totalScore: word.total_score,
    //     answer,
    //     isCorrect
    //   })

    //! Temp data for front end to use
    res.status(200).json({
        nextWord: 'some japanese word',
        wordCorrectCount: correct_count, // working, but needs to be saved in DB
        wordIncorrectCount: incorrect_count, // working, but needs to be saved in DB
        totalScore, // working, but needs to be saved in the DB
        answer,   // working
        isCorrect // working
      })

      next()
    } catch (error) {
        next(error)
    }
   
  })

module.exports = languageRouter
