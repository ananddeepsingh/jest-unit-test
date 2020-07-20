const lib = require('../exercise1');

describe('Test Exercise function', () => {
  it('should throw error if input is not number', () => {
    expect( () => { lib.fizzBuzz('0') }).toThrow()
    expect( () => { lib.fizzBuzz(null) }).toThrow()
    expect( () => { lib.fizzBuzz( {} ) }).toThrow()
    expect( () => { lib.fizzBuzz(undefined ) }).toThrow()
  })
  
  it('should return [FizzBuzz] if input is divisble by 3 and 5', () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe('FizzBuzz')
  })

  it('should return [Fizz] if input is 3', () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe('Fizz')
  })
  
  it('should return [Buzz] if input is 5', () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe('Buzz')
  })
  
  it('should return input if input is not divisible by 3 or 5', () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1)
  })
})