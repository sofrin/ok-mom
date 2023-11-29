import { createSlice } from '@reduxjs/toolkit';
import { Gift } from './types';
import { RootState } from 'shared/redux/store';

type giftSliceType = {
	goal: number;
	items: Gift[];
	balance: number;
	redeemedGifts: Gift[];
};
const initialState: giftSliceType = {
	goal: 1000,
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
	redeemedGifts: [
		{
			id: '41',
			title: 'redeemed gift title  ',
			price: 400,
			description: 'redeemed gift description ',
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
		updateGift(state, action) {
			const item = state.redeemedGifts.find(
				(item) => item.id === action.payload.id,
			);
			if (!item) return;
			item.title = action.payload.title;
			item.price = action.payload.price;
			item.description = action.payload.description;
			item.image = action.payload.image;
		},
		addRedeemedGift(state, action) {
			if (state.redeemedGifts.find((item) => item.id === action.payload.id)) {
				return;
			}
			state.redeemedGifts.push(action.payload);
			state.balance -= action.payload.price;
		},
		removeGift(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		removeRedeemedGift(state, action) {
			state.redeemedGifts = state.redeemedGifts.filter(
				(item) => item.id !== action.payload,
			);
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
		setGoal(state, action) {
			state.goal = action.payload;
		},
	},
});

export const {
	addGift,
	removeGift,
	incrementBalance,
	decrementBalance,
	setBalance,
	addRedeemedGift,
	removeRedeemedGift,
	updateGift,
	setGoal,
} = giftSlice.actions;
export const giftReducer = giftSlice.reducer;
export const selectGifts = (state: RootState) => state.gift.items;
export const selectBalance = (state: RootState) => state.gift.balance;
export const selectGoal = (state: RootState) => state.gift.goal;
export const selectRedeemedGifts = (state: RootState) =>
	state.gift.redeemedGifts;
