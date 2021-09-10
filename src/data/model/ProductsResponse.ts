export interface Image {
    id: number;
    image: string;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    images: Image[];
    category: Category;
}

export interface ProductsResponse {
    statusCode: string;
    products: Product[];
    message: string;
    devMessage: string;
}


