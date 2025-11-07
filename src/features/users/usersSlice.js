import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersFromApi, apiCreateUser, apiUpdateUser, apiDeleteUser } from './usersAPI';

// ----------------------------
// Thunks
// ----------------------------
export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  const data = await fetchUsersFromApi();
  return data.map(u => ({
    id: Number(u.id),
    name: u.name,
    username: u.username,
    email: u.email,
    city: (u.address?.city) || (u.city || ''),
    createdAt: u.createdAt || Date.now() - Math.floor(Math.random() * 1000000000),
  }));
});

export const createUser = createAsyncThunk('users/createUser', async (user, { getState }) => {
  await apiCreateUser(user);
  const state = getState();
  const ids = state.users.items.map(i => Number(i.id));
  const newId = ids.length ? Math.max(...ids) + 1 : 1;
  return { ...user, id: newId, createdAt: Date.now() };
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }) => {
  await apiUpdateUser(id, user);
  return { id, user: { ...user } };
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await apiDeleteUser(id);
  return id;
});

// ----------------------------
// Slice
// ----------------------------
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    sort: { field: null, direction: null },
  },
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
      const { field, direction } = action.payload || {};
      if (!field) return;
      state.items.sort((a, b) => {
        if (field === 'createdAt') {
          return direction === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
        }
        const av = (a[field] || '').toString().toLowerCase();
        const bv = (b[field] || '').toString().toLowerCase();
        if (av < bv) return direction === 'asc' ? -1 : 1;
        if (av > bv) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, user } = action.payload;
        const idx = state.items.findIndex(i => Number(i.id) === Number(id));
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...user };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(i => Number(i.id) !== Number(action.payload));
      });
  }
});

export const { setSort } = usersSlice.actions;
export default usersSlice.reducer;
