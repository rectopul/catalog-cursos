export interface Course {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice?: number;
    category: string;
    level: "Iniciante" | "Intermediário" | "Avançado";
    duration: string;
    students: number;
    rating: number;
    features: string[];
    modules: CourseModule[];
    instructor: {
        name: string;
        bio: string;
        avatar: string;
    };
}

export interface CourseModule {
    id: string;
    title: string;
    lessons: number;
    duration: string;
}

export interface CheckoutFormData {
    name: string;
    surname: string;
    phone: string;
    email: string;
}

export interface PaymentFormData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    password: string;
}

export interface OrderData {
    id: string;
    courseId: string;
    customer: CheckoutFormData;
    payment: PaymentFormData;
    amount: number;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
}
