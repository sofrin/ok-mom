export interface User {
	id: number;
	login: string;
	email: string;
	role: 'parent';
	children?: {
		parent_id: number;
		role: 'child';
		id: number;
		name: string;
		balance: number;
		goal: number;
	}[];
}
