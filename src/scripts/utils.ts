export const debounce = <T extends (...args: any[]) => any>(callback: T, timeout: number = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => { callback.apply(this, args); }, timeout);
  };
}

export const throttle = <T extends (...args: any[]) => any>(callback: T, timeout: number = 300) => {
  let lastCall = 0;
  
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= timeout) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
} 