import { browser } from '$app/environment';
import type { AuthenticationResponse } from '$lib/api';
import type { FastReadWritable } from '$types';
import jwt_decode from 'jwt-decode';
import { writable, type Updater } from 'svelte/store';

const StorageKey = 'session';

function isExpired(jwtToken: string) {
  const { exp } = jwt_decode(jwtToken) as { exp: string; iat: string };
  return Number.parseInt(exp) * 1000 < Date.now();
}

function getFromStorage(): AuthenticationResponse | null {
  // Security measure: token should only persist in browser
  if (!browser) return null;

  try {
    const valueStr = localStorage?.getItem(StorageKey);
    if (!valueStr) return null;

    const value = JSON.parse(valueStr) as AuthenticationResponse;
    if (!value) return null;

    if (!isExpired(value.jwtToken)) {
      return value;
    }
  } catch (e) {
    console.error('[sessionTokenStore.ts] Error getting session token', e);
  }

  localStorage.removeItem(StorageKey);
  return null;
}

function setStorage(value: AuthenticationResponse | null) {
  if (!browser) return;

  try {
    if (value) {
      localStorage?.setItem(StorageKey, JSON.stringify(value));
    } else {
      localStorage?.removeItem(StorageKey);
    }
  } catch (e) {
    console.error('[sessionTokenStore.ts] Error setting session token', e);
    try {
      localStorage?.removeItem(StorageKey);
    } catch {
      // ignore
    }
  }
}

const { subscribe, set, update } = writable<AuthenticationResponse | null>(getFromStorage());

export const SessionTokenStore: FastReadWritable<AuthenticationResponse | null> = {
  subscribe,
  get: getFromStorage,
  set(value: AuthenticationResponse | null) {
    // Security measure: token should only persist in browser
    if (!browser) return;

    if (value && isExpired(value.jwtToken)) {
      value = null;
    }
    setStorage(value);
    set(value);
  },
  update(updater: Updater<AuthenticationResponse | null>) {
    // Security measure: token should only persist in browser
    if (!browser) return;

    update((current) => {
      const value = updater(current);
      setStorage(value);
      return value;
    });
  },
};
