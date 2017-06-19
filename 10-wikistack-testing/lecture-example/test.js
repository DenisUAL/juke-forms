const Calculator = require('./calculator');
const expect = require('chai').expect;


describe('Calculator', function() {
  it('should be a function', function() {
    // if(typeof Calculator !== 'function') {
    //   throw new Error('Calculator should be a function!');
    // }
    expect(typeof Calculator).to.be.equal('function');
  });

  describe('add function', function() {

    it('should exist', function() {
      const cal = new Calculator();
      if(typeof cal.add !== 'function') {
        throw new Error('cal.add should be a function!');
      }
    });

    it('should add 2 numbers', function() {
      const cal = new Calculator();
      const result = cal.add(2,3);
      if(result !== 5) {
        throw new Error(`Expected ${result} to be 5`);
      }
    })
  })
});


