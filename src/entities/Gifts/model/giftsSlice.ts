import { createSlice } from '@reduxjs/toolkit';
import { Gift } from './types';
import { RootState } from 'shared/redux/store';

type giftSliceType = {
	items: Gift[];
	balance: number;
};
const initialState: giftSliceType = {
	balance: 1000,
	items: [
		{
			id: '1',
			title: 'gift title  1',
			price: 100,
			description: 'gift description 1',
			image: 'https://source.unsplash.com/random',
		},
		{
			id: '2',
			title: 'gift title  2',
			price: 200,
			description: 'gift description 2',
			image: 'https://source.unsplash.com/random',
		},
		{
			id: '3',
			title: 'gift title  3',
			price: 300,
			description: 'gift description 3',
			image: 'https://source.unsplash.com/random',
		},
		{
			id: '4',
			title: 'gift title  4',
			price: 400,
			description: 'gift description 4',
			image: 'https://source.unsplash.com/random',
		},
	],
};

const giftSlice = createSlice({
	name: 'gift',
	initialState,
	reducers: {
		addGift(state, action) {
			state.items.push(action.payload);
		},
		removeGift(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		incrementBalance(state, action) {
			state.balance += action.payload;
		},
		decrementBalance(state, action) {
			state.balance -= action.payload;
		},
		setBalance(state, action) {
			state.balance = action.payload;
		},
	},
});

export const {
	addGift,
	removeGift,
	incrementBalance,
	decrementBalance,
	setBalance,
} = giftSlice.actions;
export const giftReducer = giftSlice.reducer;
export const selectGifts = (state: RootState) => state.gift.items;
export const selectBalance = (state: RootState) => state.gift.balance;
