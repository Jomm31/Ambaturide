export function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ambaturide_db", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("users", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function checkDB(dbName) {
  const dbs = await indexedDB.databases();
  alert(dbs.some(db => db.name === dbName));
}

export async function describeTable(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      const description = {
        name: store.name,
        keyPath: store.keyPath,
        autoIncrement: store.autoIncrement,
        indexes: Array.from(store.indexNames),
      };

      alert(JSON.stringify(description, null, 2));
      resolve(description);
      db.close();
    };

    request.onerror = (event) => reject(event.target.error);
  });
}

export async function selectAllUsers() {
  try {
    const response = await fetch("http://localhost:3001/usersw"); // connects to backend
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    alert(JSON.stringify(users, null, 2)); // show users as JSON
    return users;
  } catch (err) {
    alert(`Error: ${err.message}`);
    throw err;
  }
}