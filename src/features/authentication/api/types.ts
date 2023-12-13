import { User } from 'entities/User/model/types';

export interface UserResponse {
	data: User;
	token: string;
}
