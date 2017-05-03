/**
 * Load application state from localStorage
 */
export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
}

/**
 * Save application state to localStorage
 * @param object state 
 */
export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (err) {
    // @todo Log error
  }
}
