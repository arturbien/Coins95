// TODO: use app version to retrieve/save data in local storage
// to avoid crashes in a situation where user has some data in local storage
// but store data model changed

export const loadState = <T = object>(stateName: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = <T = object>(stateName: string, state: T) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateName, serializedState);
  } catch {
    // ignore write errors
  }
};
