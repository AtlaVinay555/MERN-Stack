import { formatCurrency } from "../../javascript-amazon-project-main/scripts/utils/money.js";

describe('test suite: fomatCurrency', () => { //create test suite
  it('converts cents to dollars', () => { //create tests
    expect(formatCurrency(2095)).toEqual('20.95');  //compare 
    expect(formatCurrency(0)).toEqual('0.00');  //compare 
    expect(formatCurrency(2095)).toEqual('20.95');  //compare 
    expect(formatCurrency(2000.5)).toEqual('20.01');  //compare 
  });    
    it('zeroes', () => { //create tests
    expect(formatCurrency(0)).toEqual('0.00');  //compare 
  }); 
    it('rounds to zero', () => { //create tests
    expect(formatCurrency(2000.5)).toEqual('20.01');  //compare 
  });                                          
})