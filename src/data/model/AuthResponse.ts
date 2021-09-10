export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    token: string;
}

export interface AuthResponse {
    statusCode: string;
    user: User;
    message: string;
    devMessage: string;
}