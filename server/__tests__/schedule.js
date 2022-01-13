const schedule = require('../schedule.js')

describe('Schedule should', ()=>{
    
    it("push should extent the array and add an element", () => {
        //setup
        let newArray = ["value1", "value2"];
        let someValue = "Hello";
        //execute
        newArray.push(someValue);
        //assert / verify
        expect(newArray.length).toBe(3);
        expect(newArray[2]).toBe(someValue);
      });

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