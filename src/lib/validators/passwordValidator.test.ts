import { validatePassword, validatePasswordMatch } from './passwordValidator';
import { describe, expect, it } from 'vitest';

const EmptyPassword = '';
const ShortPassword = '123456789';
const LongPassword = '1234567890'.repeat(32);
const WhitespacePassword = '\n\r\t 1234567890 \n\r\t';
const CommonPassword = 'trapdoor39';
const WeakPassword = '1234qwerty1234';
const StrongPassword = 'MWBlh2bf,ghM[8Zyrk(g8OnKar@zw.+j';
const StrongPasswordNotMatching = 'MWBlh2bf,ghM[.Zyrk(g8OnKar@zw.+j';

describe('password validator test', () => {
  it('validate empty password should return false and no error', () => {
    const result = validatePassword(EmptyPassword);
    expect(result).toEqual({
      valid: false,
      message: '',
    });
  });
  it('validate password with less than 10 characters should return false and error', () => {
    const result = validatePassword(ShortPassword);
    expect(result).toEqual({
      valid: false,
      message: 'Password is too short',
    });
  });
  it('validate password with more than 256 characters should return false and error', () => {
    const result = validatePassword(LongPassword);
    expect(result).toEqual({
      valid: false,
      message: expect.any(String), // String is dynamic, so we can't compare it directly
    });
  });
  it('validate password that starts or ends with whitespace should return false and error', () => {
    const result = validatePassword(WhitespacePassword);
    expect(result).toEqual({
      valid: false,
      message: 'Password cannot start or end with whitespace',
    });
  });
  it('validate password that is a common or weak password should return false and error', () => {
    const result = validatePassword(CommonPassword);
    expect(result).toEqual({
      valid: false,
      message: 'This password is really bad™',
    });
    const result2 = validatePassword(WeakPassword);
    expect(result2).toEqual({
      valid: false,
      message: 'This password is really bad™',
    });
  });
  it('validate sttrong password should return true and no error', () => {
    const result = validatePassword(StrongPassword);
    expect(result).toEqual({
      valid: true,
      message: '',
    });
  });
});

describe('password match validator test', () => {
  it('validate empty password should return false and no error', () => {
    const result = validatePasswordMatch(EmptyPassword, EmptyPassword);
    expect(result).toEqual({
      valid: false,
      message: '',
    });
  });
  it('validate password that does not match should return false and error', () => {
    const result = validatePasswordMatch(
      StrongPassword,
      StrongPasswordNotMatching
    );
    expect(result).toEqual({
      valid: false,
      message: 'Passwords do not match',
    });
  });
  it('validate password that matches should return true and no error', () => {
    const result = validatePasswordMatch(StrongPassword, StrongPassword);
    expect(result).toEqual({
      valid: true,
      message: '',
    });
  });
});
