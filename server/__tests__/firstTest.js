describe("Array", () => {
  it("should have type array when initialized", () => {
    //setup

    //execute
    let newArray = [];
    //assert / verify
    expect(newArray).toBeInstanceOf(Array);
  });

  it("should remember a value", () => {
    //setup
    let newArray = [];
    let someValue = "Hello";
    //execute
    newArray[0] = someValue;
    //assert / verify
    expect(newArray[0]).toBe(someValue);
  });

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
});
