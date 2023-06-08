export const setGlobalItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};

export const clearAllGlobalItem = () => {
  localStorage.clear();
};

export const removeGlobalItem = (key: string) => {
  localStorage.removeItem(key);
};

export const getGlobalItem = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(localStorage.getItem(key) ?? "");
  } catch (err) {
    return "";
  }
};
