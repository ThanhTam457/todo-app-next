type User = {
    id: number | null;
    name: string | null;
    email: string | null;
    password: string | null;
}

type Task = {
    _id: number | null;
    name: string | null;
    userId: number |null;
}
