const bus = require('../bus.js')

describe('Bus reservations', ()=>{
    it('should have capacity',()=>{
        //setup

        //execute
        let capacity = bus.remainingCapacity()

        //assert / verify
        expect(capacity >0).toBeTruthy()
        
    })
    it('should use up capacity when a person reserves',()=>{
        //setup
        let oldCapacity = bus.remainingCapacity()

        //execute
        bus.reserveSeat({name:'Tony'})

        //assert
        let newCapacity = bus.remainingCapacity()
        expect(newCapacity).toBe(oldCapacity-1)
    })
    it('',()=>{

    })
    it('',()=>{

    })
    it('',()=>{

    })
})