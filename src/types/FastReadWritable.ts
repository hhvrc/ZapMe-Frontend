import type { Writable } from 'svelte/store';

export interface FastReadWritable<T> extends Writable<T> {
  get(): T;
}
