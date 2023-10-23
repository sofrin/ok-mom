import debounce from 'lodash.debounce';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import { Box, InputAdornment } from '@mui/material';
import { useAppDispatch } from 'shared/model/hooks';
import { tasksApi } from 'entities/CardTask/api/tasksApi';

export const SearchInput: React.FC = () => {
	const [value, setValue] = useState<string>('');
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);
	const updateSearchValue = useCallback(
		debounce((str: string) => {
			const fetchTasks = async () => {
				str = `?title=${str}`;
				dispatch(
					tasksApi.endpoints.getTasks.initiate(str, {
						subscribe: false,
						forceRefetch: true,
					}),
				);
			};
			fetchTasks();
		}, 1000),
		[],
	);
	const onClickClose = () => {
		updateSearchValue('');
		setValue('');
		inputRef.current?.focus();
	};
	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<Box
			sx={{
				margin: '16px',
				display: 'flex',
				justifyContent: 'center',
				position: 'relative',
			}}
		>
			<TextField
				sx={{
					width: '22rem',
				}}
				variant='outlined'
				// className='border-2 w-96 rounded-lg border-gray-600 pl-4 opacity-50 focus:opacity-70 '
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				placeholder='Поиск задачи...'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							{value !== '' && (
								<CloseIcon
									onClick={onClickClose}
									sx={{
										opacity: '30',
										cursor: 'pointer',
										'&:hover': { opacity: '80', color: 'gray' },
									}}
								/>
							)}
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};
