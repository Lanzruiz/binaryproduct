const express = require('express')

const AuthCtrl = require('../controllers/auth-ctrl')

const router = express.Router()

router.post('/login', AuthCtrl.login)
router.post('/jwt', AuthCtrl.createJwt)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.get('/movies', MovieCtrl.getMovies)
// router.get('/test', MovieCtrl.testController)

module.exports = router