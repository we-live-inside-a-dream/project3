
const MAX_BUS_CAPACITY = 8

let seats = []

function remainingCapacity(){
    return MAX_BUS_CAPACITY - seats.length
}

function reserveSeat(person){
    if(seats.length > MAX_BUS_CAPACITY){
        throw new Error('the bus is full!')
    }
    seats.push(person)
}
module.exports = {
    reserveSeat,
    remainingCapacity
}