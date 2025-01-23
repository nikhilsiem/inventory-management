import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
    const data = await response.json();
    data.forEach(data => {
      return data.price = data.price.slice(1);
    })
    return data;
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  isAdmin: true,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    toggleUserMode: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    toggleProductStatus: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.disabled = !item.disabled;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
          ...item,
          disabled: false,
          id: Math.random().toString(36).substr(2, 9)
        }));
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleUserMode, deleteProduct, updateProduct, toggleProductStatus } = inventorySlice.actions;
export default inventorySlice.reducer;