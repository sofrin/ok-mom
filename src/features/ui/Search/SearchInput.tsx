import debounce from 'lodash.debounce';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { taskSchema } from 'src/Components/AddTaskDialog';
import { Box, InputAdornment } from '@mui/material';

type SearchProps = {
    setisLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setTasks: React.Dispatch<React.SetStateAction<taskSchema[]>>,
}

export const SearchInput: React.FC<SearchProps> = ({ setisLoading, setTasks }) => {

    const [value, setValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            const fetchTasks = async () => {
                setisLoading(true)
                const response = await fetch(`https://64f8d138824680fd21801557.mockapi.io/tasks?title=${str}`, {
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
                })
                const tasks = await response.json()
                setTasks(tasks)
                setisLoading(false)

            };
            fetchTasks()
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
        <Box sx={{
            margin: '16px', display: 'flex', justifyContent: 'center', position: 'relative'
        }}
        >
            <TextField
                sx={{
                    width: '22rem'
                }}
                variant="outlined"
                // className='border-2 w-96 rounded-lg border-gray-600 pl-4 opacity-50 focus:opacity-70 '
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                placeholder='Поиск задачи...'

                InputProps={{
                    endAdornment:
                        <InputAdornment position='end'>
                            {value !== '' &&
                                (<CloseIcon
                                    onClick={onClickClose}
                                    sx={{
                                        opacity: '30',
                                        cursor: 'pointer',
                                        '&:hover': { opacity: '80', color: 'gray' }
                                    }} />)}
                        </InputAdornment>
                }}
            />
        </Box>
    );
};
