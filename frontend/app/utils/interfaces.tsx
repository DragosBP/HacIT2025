export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    reviews: Review[];
}

export interface Review {
    userId: User;
    cartierId: string;
    comments: Comment[];
    title: string;
    text: string;
    grade: number;
    nrLikes: number;
    _id: string;
}

export interface Comment {
    userId: User;
    reviewId: string;
    text: string;
    _id: string;
}

export interface Cartier {
    _id: string;
    name: string;
    city: string;
    judet: string;
    sector: string;
    reviews: Review[];
    loc: string;
}