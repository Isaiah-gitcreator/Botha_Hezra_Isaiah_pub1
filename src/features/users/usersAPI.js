const BASE = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';
//un do the comment above if you want to host from  that base


//const BASE = 'http://localhost:3001/users';


//Otherwise am hosting from local server fetch('http://localhost:3001/users') 

//export async function fetchUsersFromApi() {
 // const res = await fetch(BASE);
 // if (!res.ok) throw new Error('Failed to load users');
 // return res.json();
//}


export async function fetchUsersFromApi() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load users');
  return res.json(); // now it will include your 11th user
}


// For realism we create simulated responses for POST/PUT/DELETE
export async function apiCreateUser(user) {
  // This test API won't persist; we simulate latency and return the user
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
