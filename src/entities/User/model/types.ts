type Parent = {
	id: number;
	login: string;
	email: string;
	role: 'parent';
	children?: Child[];
};

type Child = {
	parent_id: number;
	role: 'child';
	id: number;
	name: string;
	balance: number;
	goal: number;
	login: string;
	email: string;
};

export type User = Parent | Child;
