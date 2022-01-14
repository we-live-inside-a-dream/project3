let scheduleList = require('./scheduleList.json')
let scheduleModel = require('./schedule')

scheduleList.forEach(async (hero) => {
    console.log('Creating superhero:', hero.superheroName)
    let createdId = await superheroModel.createSuperhero(hero)
    console.log('... created with id', createdId)
})
