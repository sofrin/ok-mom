import { createSlice } from '@reduxjs/toolkit';
import { Gift } from 'entities/Gifts/model/types';

import { RootState } from 'shared/redux/store';

type initialStateType = {
	items: Gift[];
};

const initialState: initialStateType = {
	items: [
		{
			id: '1',
			title: 'suggestion title  1',
			price: 100,
			description: 'suggestion description 1',
			image: 'https://source.unsplash.com/random',
		},
		{
			id: '2',
			title: 'suggestion title  2',
			price: 200,
			description: 'suggestion description 2',
			image: 'https://source.unsplash.com/random',
		},
	],
};
const suggestionsSlice = createSlice({
	name: 'suggestions',
	initialState,
	reducers: {
		addSuggestion(state, action) {
			state.items.push(action.payload);
		},
		removeSuggestion(state, action) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
	},
});

export const { addSuggestion, removeSuggestion } = suggestionsSlice.actions;
export const suggestionsReducer = suggestionsSlice.reducer;
export const selectSuggestions = (state: RootState) => state.suggestions.items;
