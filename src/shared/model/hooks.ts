import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from 'features/authentication/model/authSlice';
import { AppDispatch, RootState } from 'shared/redux/store';

export const useAuth = () => {
	const user = useAppSelector(selectCurrentUser);
	return useMemo(() => ({ user }), [user]);
};
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
