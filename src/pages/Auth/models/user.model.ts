export interface User {
    id: number;
    name: string;
    email: string;
    gender: Gender;
    status: Status;
}

type Gender = 'female' | 'male';
type Status = 'active' | 'inactive';