import { createSlice } from '@reduxjs/toolkit';
import { Gift } from 'entities/Gifts/model/types';

import { RootState } from 'shared/redux/store';
import ImgUrl from '../../../assets/randompic.avif';
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
			image: {
				ImgUrl,
			},
		},
		{
			id: '2',
			title: 'suggestion title  2',
			price: 200,
			description: 'suggestion description 2',
			image: { ImgUrl },
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
