const mongoose = require ('../models/mongooseDb')

const scheduleModel = require('../models/schedule')

describe('Schedule model', ()=>{


    afterAll(() => {
        console.log('Disconnecting DB')
        return mongoose.disconnect()
    })
    
    it('should create a schedule',async () => {
        //setup

        //execute
        let createdId = await scheduleModel.createSchedule({
            name: 'Brian', start:8,end:4
        })

        //verify
        let newSchedule = await scheduleModel.findById(createdId)
        expect(newSchedule.name).toBe('Brian')
        expect(newSchedule.start).toBe(8)
        expect(newSchedule.end).toBe(4)
    })

    it('should...',()=>{
        //setup

        //execute
        

        //assert / verify
          
    })

    it('should...',()=>{
        //setup

        //execute
        

        //assert / verify
          
    })
    

    it('should...',()=>{
        //setup

        //execute
        

        //assert / verify
          
    })

})