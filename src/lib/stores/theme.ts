import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const initial: Theme =
  browser && localStorage.getItem('theme') === 'light'
    ? 'light'
    : 'dark';

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(initial);

  return {
    subscribe,
    toggle() {
      update(t => (t === 'dark' ? 'light' : 'dark'));
    },
    set
  };
}

export const theme = createThemeStore();