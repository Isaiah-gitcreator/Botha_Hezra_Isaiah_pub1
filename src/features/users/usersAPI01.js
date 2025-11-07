// =========================
// USERS API MODULE
// =========================

// Remote JSON server (uncomment to use)
// const BASE = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

// Local JSON server (comment out if using remote)
const BASE = 'http://localhost:3001/users';

/**
 * Fetch users from API (remote or local based on BASE)
 */
export async function fetchUsersFromApi() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load users');
  return res.json(); // includes all users from remote or local
}

/**
 * Simulated POST (create), PUT (update), DELETE (remove) operations
 * These won't persist but mimic API latency
 */
export async function apiCreateUser(user) {
  await new Promise(r => setTimeout(r, 300));
  return { success: true, data: user };
}

export async function apiUpdateUser(userId, user) {
  await new Promise(r => setTimeout(r, 300));
  return { success: true, data: user };
}

export async function apiDeleteUser(userId) {
  await new Promise(r => setTimeout(r, 200));
  return { success: true };
}
