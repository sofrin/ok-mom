import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from 'features/authentication/model/authSlice';
import { AppDispatch, RootState } from 'shared/redux/store';

export const useAuth = () => {
	const user = useAppSelector(selectCurrentUser);
	return useMemo(() => ({ user }), [user]);
};

export const useGetUserInfo = () => {
	const isAuth = useAuth();
	let parent_id: number | undefined;
	let username = '';
	if (isAuth.user?.role === 'child') {
		parent_id = isAuth.user.parent_id;
		username = isAuth.user.name;
	}
	if (isAuth.user?.role === 'parent') {
		parent_id = isAuth.user.id;
		username = isAuth.user.children[0].name;
	}
	return { parent_id, username };
};
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
