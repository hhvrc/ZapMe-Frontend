import type { AuthenticationResponse } from '$lib/api';
import { persisted } from 'svelte-local-storage-store';
import jwt_decode from "jwt-decode";
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

const InternalSessionStore = persisted<AuthenticationResponse | null>('session', null, {
  storage: 'local',
});

function isExpired(jwtToken: string) {
  const { exp } = jwt_decode(jwtToken) as { exp: string, iat: string };
  return Number.parseInt(exp) * 1000 < Date.now();
}

export interface FastReadWriteable<T> extends Writable<T> {
    /**
     * Get value
     * @param value to set
     */
    get(this: void): T;
}

export const SessionTokenStore: FastReadWriteable<AuthenticationResponse |  null> = {
  ...InternalSessionStore,
  set(value) {
    if (value && isExpired(value.jwtToken)) {
      value = null;
    }
    InternalSessionStore.set(value);
  },
  get() {
    if (!browser) return null;

    const valueStr = localStorage?.getItem('session');
    if (!valueStr) return null;

    const value = JSON.parse(valueStr) as AuthenticationResponse;
    if (!value) return null;

    if (isExpired(value.jwtToken)) {
      InternalSessionStore.set(null);
      return null;
    }

    return value;
  }
}

/*
export function GetSession(): AuthenticationResponse | null {
  try {
    if (!browser) return null;
    if (_AuthenticationResponse) return _AuthenticationResponse;

    const sessionStr = localStorage?.getItem('session');
    if (!sessionStr || sessionStr === "null") return null;

    const { token, issued, expires } = JSON.parse(sessionStr);
    if (!isString(token) || !isNumber(issued) || !isNumber(expires) || Date.now() > expires)
    {
      localStorage?.removeItem('session');
      return null;
    }

    const session: AuthenticationResponse = {
      jwtToken: token,
    };
    _AuthenticationResponse = session;
    return session;
  } catch {
    localStorage?.removeItem('session');
    return null;
  }
}
*/