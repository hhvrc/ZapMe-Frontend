import type { UserDto } from '$lib/api';
import { writable } from 'svelte/store';

class UserRepository {
  private usersById: Map<string, UserDto> = new Map();
  private usersByName: Map<string, UserDto> = new Map();

  constructor(users: UserDto[]) {
    this.setAll(users);
  }

  setAll(users: UserDto[]) {
    this.usersById = new Map(users.map((u) => [u.id, u]));
    this.usersByName = new Map(users.map((u) => [u.username, u]));
  }

  getAll() {
    return Array.from(this.usersById.values());
  }

  upsert(user: UserDto) {
    this.usersById.set(user.id, user);
  }

  getById(id: string) {
    return this.usersById.get(id);
  }

  getByName(name: string) {
    return this.usersByName.get(name);
  }

  updateById(id: string, updater: (user: UserDto) => UserDto) {
    const user = this.usersById.get(id);
    if (!user) return;

    const result = updater(user);
    if (result) {
      this.usersById.set(id, result);
    } else {
      this.usersById.delete(id);
    }
  }

  updateByName(name: string, updater: (user: UserDto) => UserDto) {
    const user = this.usersByName.get(name);
    if (!user) return;

    const result = updater(user);
    if (result) {
      this.usersByName.set(name, result);
    } else {
      this.usersByName.delete(name);
    }
  }

  removeById(id: string) {
    this.usersById.delete(id);
  }

  removeByName(name: string) {
    this.usersByName.delete(name);
  }
}

const { subscribe, update } = writable<UserRepository>(new UserRepository([]));

export const UsersStore = {
  subscribe,
  setAll(users: UserDto[]) {
    update((store) => {
      store.setAll(users);
      return store;
    });
  },
  upsertUser(user: UserDto) {
    update((store) => {
      store.upsert(user);
      return store;
    });
  },
  updateUserById(id: string, updater: (user: UserDto) => UserDto) {
    update((store) => {
      store.updateById(id, updater);
      return store;
    });
  },
  updateUserByName(name: string, updater: (user: UserDto) => UserDto) {
    update((store) => {
      store.updateByName(name, updater);
      return store;
    });
  },
  removeUserById(id: string) {
    update((store) => {
      store.removeById(id);
      return store;
    });
  },
  removeUserByName(name: string) {
    update((store) => {
      store.removeByName(name);
      return store;
    });
  },
};
