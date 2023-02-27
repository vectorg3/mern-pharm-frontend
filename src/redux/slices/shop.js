import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const { data } = await axios.get('/products');
        return data;
    }
);
export const fetchCreateOrder = createAsyncThunk(
    'products/fetchCreateOrder',
    async (params) => {
        const { data } = await axios.post('/orders', params);
        return data;
    }
);
export const fetchUserOrders = createAsyncThunk(
    'products/fetchUserOrders',
    async () => {
        const { data } = await axios.get('/orders/user');
        return data;
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        goods: [],
        loading: true,
        order: [],
        isCartShow: false,
        menuVisible: false,
        userOrders: [],
        userOrdersLoading: true,
    },
    reducers: {
        toggleCart(state) {
            state.isCartShow = !state.isCartShow;
        },
        toggleMenu(state) {
            state.menuVisible = !state.menuVisible;
        },
        addToCart(state, action) {
            const itemIndex = state.order.findIndex(
                (orderItem) => orderItem.id === action.payload.id
            );
            if (itemIndex < 0) {
                state.order.push({ ...action.payload, quantity: 1 });
            } else {
                state.order.map((orderItem) => {
                    if (orderItem.id === action.payload.id) {
                        orderItem.quantity++;
                        return orderItem;
                    } else {
                        return orderItem;
                    }
                });
            }
        },
        incQuantity(state, action) {
            state.order.map((orderItem) => {
                if (orderItem.id === action.payload.id) {
                    orderItem.quantity++;
                    return orderItem;
                } else {
                    return orderItem;
                }
            });
        },
        decQuantity(state, action) {
            state.order.map((orderItem) => {
                if (orderItem.id === action.payload.id) {
                    if (orderItem.quantity > 1) {
                        orderItem.quantity--;
                    }
                    return orderItem;
                } else {
                    return orderItem;
                }
            });
        },

        removeFromCart(state, action) {
            state.order = state.order.filter(
                (el) => el.id !== action.payload.id
            );
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.loading = true;
            state.goods = [];
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.goods = action.payload;
        },
        [fetchProducts.rejected]: (state) => {
            state.loading = false;
            state.goods = [];
        },
        [fetchUserOrders.pending]: (state) => {
            state.userOrdersLoading = true;
            state.userOrders = [];
        },
        [fetchUserOrders.fulfilled]: (state, action) => {
            state.userOrdersLoading = false;
            state.userOrders = action.payload;
        },
        [fetchUserOrders.rejected]: (state) => {
            state.userOrdersLoading = false;
            state.userOrders = [];
        },
    },
});
export default shopSlice.reducer;
export const {
    toggleMenu,
    toggleCart,
    addToCart,
    removeFromCart,
    incQuantity,
    decQuantity,
} = shopSlice.actions;
