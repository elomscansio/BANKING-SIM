import * as React from "react";

const UID_KEY = "UID_KEY";

export function generateRandomUID() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0]);
}

export function useUID() {
  const [user_id, setUID] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let stored = window.localStorage.getItem(UID_KEY);
      if (!stored) {
        stored = generateRandomUID();
        window.localStorage.setItem(UID_KEY, stored);
      }
      setUID(stored);
    }
  }, []);

  return user_id;
}
