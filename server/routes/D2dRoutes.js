const express = require('express')
const router = express.Router()

const superheroModel = require('../models/superhero')

const mustBeLoggedIn = async (req, res, next) => {
    if (req.user) {
        next()
        return
    }
    res.sendStatus(401)
}

// const mustBeAgent = async (req, res, next) => {
//     if (req.user && req.user.isAgent) {
//         next()
//         return
//     }
//     res.sendStatus(401)
// }

router.get('/superhero', async (req, res) => {
    let superheroList = await superheroModel.listSuperheros()
    res.send(superheroList)
})

router.post('/superhero', mustBeLoggedIn, async (req, res) => {
    let newSuperhero = req.body
    let createdId = await superheroModel.createSuperhero(newSuperhero)
    res.send(createdId)
})

router.get('/superhero/:id', async (req, res) => {
    let id = req.params.id
    let superhero = await superheroModel.findById(id)
    res.send(superhero)
})

router.post('/superhero/:id', mustBeLoggedIn, async (req, res) => {
    let id = req.params.id
    let updatedSuperhero = req.body
    console.log('updating superhero', id, 'with', updatedSuperhero)
    let superhero = await superheroModel.update(id, updatedSuperhero)
    res.send(superhero)
})

router.delete('/superhero/:id', mustBeLoggedIn, async (req, res) => {
    let id = req.params.id
    console.log('deleting superhero', id)
    let deletedSuperhero = await superheroModel.deleteSuperhero(id)
    res.send(deletedSuperhero)
})
module.exports = router
