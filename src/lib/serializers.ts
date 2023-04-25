const Passtrough = <T>(val: T): T => val;
const ToString = (val: any): string => val.toString();
const ToNumber = (val: any): number => Number(val);
const ToBoolean = (val: any): boolean => Boolean(val);
const ToDate = (val: any): Date => new Date(val);

export const StringSerializer = { parse: Passtrough, stringify: Passtrough };
export const NumberSerializer = { parse: ToNumber, stringify: ToString };
export const BooleanSerializer = { parse: ToBoolean, stringify: ToString };
export const DateSerializer = { parse: ToDate, stringify: ToString };
export const JSONSerializer = { parse: JSON.parse, stringify: JSON.stringify };
