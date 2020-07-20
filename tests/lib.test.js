const lib = require('../lib');
const db = require('../db');
const mail  = require('../mail');

describe( 'Test absolute function ', () => {
  
  it('should return + if number is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1)  // toBe function compare references of this object in memory
  })
  
  it('should return -ive if number is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1)
  })
  
  it('should return Zero if number is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0)
  })
})

describe('Test greet function', () => {
  it('should return greeting message', () => {
    const result = lib.greet('Anand');
    // expect(result).toBe('Welcome Anand')
    // expect(result).toMatch(/Anand/);
    expect(result).toContain('Anand')
  })
})

describe('Test Currency Function', () => {
  it('should return supported Currency', () => {
    const result = lib.getCurrencies();
    // expect(result).toEqual(expect.arrayContaining(['EUR', 'USD','AUS']));
  })
})

describe('Test getProduct Function', () => {
  it('should return product with given id', () => {
    const result = lib.getProduct(1);

    expect(result).toEqual({ id: 1, price: 10 }); // toBe required to pass all the properties of object
    expect(result).toMatchObject({ id: 1, price: 10 }); // toMatchObject can test whatever properties we want to test in object
    expect(result).toHaveProperty('id',1)
  })
})

describe('register user', () => {
  it('should throw error if username is falsy', () => {
      const argu = [null, undefined, NaN,'', 0, false];
      for(let ele of argu){
      //  console.log(ele)
        expect( () => { lib.registerUser(ele)}).toThrow()
      }
  })
  it('should return a valid user name object if username is passed', () => {
    const result = lib.registerUser('Anand')
    expect(result).toMatchObject({username: 'Anand'});
    expect(result.id).toBeGreaterThan(0)
  })
})

describe('apply disuount function', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
      db.getCustomerSync = function (id) {
        console.log('Fake service');
        return { id, points : 20}
      }
      const order = { customerId: 1, totalPrice: 10 };
      lib.applyDiscount( order )
      expect(order.totalPrice).toBe(9)
  })
})

describe('Notify Customer', () => {

    // const mockFunction = jest.fn();
    //mockFunction.mockReturnValue(1);
    //mockFunction.mockResolvedValue(1);

    // ##########################################
    // in case of Promise Rejected, need try catch blog
    //##########################################

    // mockFunction.mockRejectedValue(new Error('Something went wrong')); 

    // try{
    //   const result = await mockFunction();
    // }catch( e ) {
    //   console.error(e.message)
    // }

    // ##########################################
    // option 1 and 2 both are same
    // ##########################################

    // option 1
    it('should send an email to customer', () => {
      db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'})
      mail.send = jest.fn();

      lib.notifyCustomer({customerId: 1})
      expect(mail.send).toHaveBeenCalled()
    })

    // option 2 [start]
    //   db.getCustomerSync = function( customerId ){
    //     return {email : 'a'}
    //   }
    //   let mailSent = false;
    //   mail.send = function( email, msg ) {
    //     mailSent = true;
    //   }

    // it('should send an email to customer', () => {
    //     lib.notifyCustomer({customerId: 1})
    //     expect(mailSent).toBe(true)
    //   })
  
    // [end]
})