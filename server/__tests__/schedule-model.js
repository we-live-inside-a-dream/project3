const mongoose = require ('../models/mongooseDb')

const scheduleModel = require('../models/schedule')

describe('Schedule model', ()=>{


    afterAll(() => {
        console.log('Disconnecting DB')
        return mongoose.disconnect()
    })
    
    it('should create a schedule',async() => {
        //setup

        //execute
        let createdId = await scheduleModel.createSchedule({
            name:'Brian'
        })

        //verify
        
        let foundSchedule = await scheduleModel.findById(createdId)
        expect(foundSchedule.name).toBe('Brian')
        
    })

    it('should find id and update',async()=>{
        //setup
        let createdId = await scheduleModel.createSchedule(
            {name:'Brian',start:8,end:4 })
        let schedule =  await scheduleModel.findById(createdId)
        console.log(schedule) 

        //execute
        newSchedule = await scheduleModel.update(createdId, {start:2,end:20})
        console.log("newSchedule",newSchedule)
        //verify
        expect(newSchedule.start).toBe(schedule.start-6)
   
    })

    // it('should'()=>{


    // })
})