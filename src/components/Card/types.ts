export interface CardProps {
    id?: number;
    name: string;
    phone: string;
    email: string;
    image: { url: string; alt: string };
    favoured: boolean;
    index?: number;
    color: string;
    gender: string;
}
