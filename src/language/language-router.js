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
      let totalScore = req.language.total_score
      let isCorrect

      if(guess.toLowerCase() === answer.toLowerCase()) {
        SLL.head.value.memory_value *= 2
        SLL.head.value.correct_count++
        totalScore++
        isCorrect = true
      } else {
        SLL.head.value.memory_value = 1
        SLL.head.value.incorrect_count++
        isCorrect = false
      }
      // get the values for the correct count before changing the head
      let nextWord = SLL.head.value.original
      let wordCorrectCount = SLL.head.value.correct_count
      let wordIncorrectCount = SLL.head.value.incorrect_count

      // move head 'M' places back. 
      // After this point, SLL looks exactly as we want the database to be
      SLL.moveHead(SLL.head.value.memory_value)

      // update the Language.head
      await LanguageService.updateLanguageHead(
          req.app.get('db'),
          req.language.id,
          SLL.head.value.id
      )
      
      // update Language.total_score
      await LanguageService.updateTotalScore(
        req.app.get('db'),
        req.language.id,
        totalScore
      )

      //update words
      await LanguageService.updateWords(
        req.app.get('db'),
        SLL
      )
    
    SLL.display()

    res.status(200).json({
        nextWord, 
        wordCorrectCount,
        wordIncorrectCount,
        totalScore, 
        answer, 
        isCorrect 
      })

      next()
    } catch (error) {
        next(error)
    }
   
  })

module.exports = languageRouter
