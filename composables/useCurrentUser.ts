import { defineStore } from 'pinia';

export interface AuthUser {
  id?: number;
  name?: string;
  email?: string;
  profilePath?: string | null;
  tenantId: number;
  roles: string[];
}

const defaultUser: AuthUser = {
  id: undefined,
  name: undefined,
  email: undefined,
  profilePath: undefined,
  tenantId: 0,
  roles: [],
};

const getCurrentUser = (): AuthUser => {
  if (typeof window === 'undefined') {
    return defaultUser;
  }

  const local = window.atob(localStorage.getItem('current') || '');

  if (local) {
    return JSON.parse(local) as AuthUser;
  }

  return defaultUser;
};

const setCurrentUser = (user: AuthUser) => {
  localStorage.setItem('current', window.btoa(JSON.stringify(user)));
};

export const useCurrentUser = defineStore('current-user', {
  state: (): { user: AuthUser } => ({ user: getCurrentUser() }),
  actions: {
    get(): AuthUser {
      return this.user;
    },
    set(user: AuthUser) {
      this.user = user;
      setCurrentUser(this.user);
    },
    update(user: Partial<AuthUser>) {
      this.user = { ...this.user, ...user };
      setCurrentUser(this.user);
    },
    hasRole(...roles: string[]) {
      return roles.some((role) => this.user.roles.includes(role));
    },
    logout() {
      this.user = defaultUser;
      setCurrentUser(this.user);
    },
  },
  hydrate(storeState, _initialState) {
    storeState.user = getCurrentUser();
  },
});
