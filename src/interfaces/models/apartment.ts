export interface IApartment {
	number: number;
	floor: number;
	image: string;
	owner: {
		name: string;
		phone: string;
	};
	createdAt: Date;
	updatedAt: Date;

}
