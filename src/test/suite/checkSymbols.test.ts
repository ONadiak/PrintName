import { checkForSymbols } from '../../functions/helperFunctions';
import * as assert from 'assert';
const { describe, it } = require('mocha'); 

describe('checkForSymbols function', () => {
  it('should return true if both names contain valid characters', () => {
    const firstName = 'Ostap';
    const lastName = 'Nadiak';
    const result = checkForSymbols(firstName, lastName);
    assert.equal(result, true);
  });

  it('should return false if firstName contains invalid characters', () => {
    const firstName = 'Ostap@';
    const lastName = 'Nadiak';
    const result = checkForSymbols(firstName, lastName);
    assert.equal(result, false);
  });

  it('should return false if lastName contains invalid characters', () => {
    const firstName = 'Ostap';
    const lastName = 'Nadiak@';
    const result = checkForSymbols(firstName, lastName);
    assert.equal(result, false);
  });

  it('should return false if either name length exceeds 15 characters', () => {
    const firstName = 'ThisIsALongFirstName';
    const lastName = 'Nadiak';
    const result = checkForSymbols(firstName, lastName);
    assert.equal(result, false);
  });
});