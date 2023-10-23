import { User } from "entities/User/model/types";

export interface UserResponse {
	user: User;
	token: string;
}
