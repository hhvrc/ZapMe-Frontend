import { type Writable, writable } from 'svelte/store'

function localStorageGetString(key: string, initialValue: string): string {
  const storage = localStorage.getItem(key);
  return storage ?? initialValue;
}
function localStorageSetString(key: string, value: string) {
  localStorage.setItem(key, value);
}
function localStorageGetNumber(key: string, initialValue: number): number {
  const storage = localStorage.getItem(key);
  return storage ? parseInt(storage) : initialValue;
}
function localStorageGetBoolean(key: string, initialValue: boolean): boolean {
  const storage = localStorage.getItem(key);
  return storage ? storage === 'true' : initialValue;
}
function localStorageSetNumberOrBoolean(key: string, value: number|boolean) {
  localStorage.setItem(key, value.toString());
}
function localStorageGetObject<T>(key: string, initialValue: T): T {
  const storage = localStorage.getItem(key);
  if (storage) {
    try {
      return JSON.parse(storage);
    } catch (e) {
      console.error(`Error parsing JSON from localStorage key ${key}`);
    }
  }
  
  return initialValue;
}
function localStorageSetObject<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function persistentStringStore(key: string, initialValue: string, onInitalFetch?: (value: string) => string): Writable<string> {
  let value = localStorageGetString(key, initialValue);
  if (onInitalFetch) value = onInitalFetch(value);
  const store = writable(value);
  store.subscribe((value) => localStorageSetString(key, value));
  return store;
}
function persistentNumberStore(key: string, initialValue: number, onInitalFetch?: (value: number) => number): Writable<number> {
  let value = localStorageGetNumber(key, initialValue);
  if (onInitalFetch) value = onInitalFetch(value);
  const store = writable(value);
  store.subscribe((value) => localStorageSetNumberOrBoolean(key, value));
  return store;
}
function persistentBooleanStore(key: string, initialValue: boolean, onInitalFetch?: (value: boolean) => boolean): Writable<boolean> {
  let value = localStorageGetBoolean(key, initialValue);
  if (onInitalFetch) value = onInitalFetch(value);
  const store = writable(value);
  store.subscribe((value) => localStorageSetNumberOrBoolean(key, value));
  return store;
}
function persistentObjectStore<T>(key: string, initialValue: T, onInitalFetch?: (value: T) => T): Writable<T> {
  let value = localStorageGetObject(key, initialValue);
  if (onInitalFetch) value = onInitalFetch(value);
  const store = writable(value);
  store.subscribe((value) => localStorageSetObject(key, value));
  return store;
}

export type PersistentWritable<T> = Writable<T> & {
  reset: () => void;
  clear: () => void;
}

// This is stupid, but it works. If typescript was smart enough to return the correct function based on T then we wouldn't need this.
export function persistentStore<T>(key: string, initialValue: T, onInitalFetch?: (value: T) => T): PersistentWritable<T> {
  if (!key || key === '') {
    throw new Error('Key must be a non-empty string');
  }

  let store: Writable<T>;

  switch (typeof initialValue) {
    case 'string':
      store = persistentStringStore(key, initialValue as string, onInitalFetch as (value: string) => string) as Writable<T>;
      break;
    case 'number':
      store = persistentNumberStore(key, initialValue as number, onInitalFetch as (value: number) => number) as Writable<T>;
      break;
    case 'boolean':
      store = persistentBooleanStore(key, initialValue as boolean, onInitalFetch as (value: boolean) => boolean) as Writable<T>;
      break;
    case 'object':
      store = persistentObjectStore(key, initialValue as T, onInitalFetch) as Writable<T>;
      break;
    default:
      throw new Error('Invalid type for persistent store');
  }

  return {
    ...store,
    reset: () => {
      store.set(initialValue);
    },
    clear: () => {
      localStorage.removeItem(key);
    },
  };
}