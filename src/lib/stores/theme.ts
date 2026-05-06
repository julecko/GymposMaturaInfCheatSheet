import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
  const stored = browser ? (localStorage.getItem('theme') as Theme) : null;
  const initial: Theme = stored ?? 'dark';

  const { subscribe, set, update } = writable<Theme>(initial);

  if (browser) {
    document.documentElement.setAttribute('data-theme', initial);
  }

  return {
    subscribe,
    toggle() {
      update(t => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        if (browser) {
          localStorage.setItem('theme', next);
          document.documentElement.setAttribute('data-theme', next);
        }
        return next;
      });
    },
    set(t: Theme) {
      set(t);
      if (browser) {
        localStorage.setItem('theme', t);
        document.documentElement.setAttribute('data-theme', t);
      }
    }
  };
}

export const theme = createThemeStore();