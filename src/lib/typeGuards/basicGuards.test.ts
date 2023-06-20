import { describe, expect, it } from 'vitest';
import { isObject, isString, isNumber } from './basicGuards';

describe('isObject type guard test', () => {
  it('isObject should return true for object', () => {
    const result = isObject({});
    expect(result).toEqual(true);
  });
  it('isObject should return false for string', () => {
    const result = isObject('');
    expect(result).toEqual(false);
  });
  it('isObject should return false for number', () => {
    const result = isObject(1);
    expect(result).toEqual(false);
  });
  it('isObject should return false for null', () => {
    const result = isObject(null);
    expect(result).toEqual(false);
  });
  it('isObject should return false for undefined', () => {
    const result = isObject(undefined);
    expect(result).toEqual(false);
  });
});

describe('isString type guard test', () => {
  it('isString should return true for non-empty string', () => {
    const result = isString(' ');
    expect(result).toEqual(true);
  });
  it('isString should return false for number', () => {
    const result = isString(1);
    expect(result).toEqual(false);
  });
  it('isString should return false for object', () => {
    const result = isString({});
    expect(result).toEqual(false);
  });
  it('isString should return false for null', () => {
    const result = isString(null);
    expect(result).toEqual(false);
  });
  it('isString should return false for undefined', () => {
    const result = isString(undefined);
    expect(result).toEqual(false);
  });
  it('isString should return false for array', () => {
    const result = isString([]);
    expect(result).toEqual(false);
  });
});

describe('isNumber type guard test', () => {
  it('isNumber should return true for number', () => {
    const result = isNumber(1);
    expect(result).toEqual(true);
  });
  it('isNumber should return false for string', () => {
    const result = isNumber('');
    expect(result).toEqual(false);
  });
  it('isNumber should return false for object', () => {
    const result = isNumber({});
    expect(result).toEqual(false);
  });
  it('isNumber should return false for null', () => {
    const result = isNumber(null);
    expect(result).toEqual(false);
  });
  it('isNumber should return false for undefined', () => {
    const result = isNumber(undefined);
    expect(result).toEqual(false);
  });
  it('isNumber should return false for array', () => {
    const result = isNumber([]);
    expect(result).toEqual(false);
  });
});