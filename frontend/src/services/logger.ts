const isDev = import.meta.env.MODE === 'development';

export const log = {
  debug: (...args: any[]) => {
    if (isDev) console.debug('%c[DEBUG]', 'color: #888', ...args);
  },
  info: (...args: any[]) => {
    if (isDev) console.info('%c[INFO]', 'color: blue', ...args);
  },
  warn: (...args: any[]) => {
    console.warn('%c[WARN]', 'color: orange', ...args);
  },
  error: (...args: any[]) => {
    console.error('%c[ERROR]', 'color: red', ...args);
  }
};
