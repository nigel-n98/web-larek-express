export type Payment = 'card' | 'online';

export interface CreateOrderBody {
    items: string[],
    total: number,
    payment: Payment,
    email: string,
    phone: string,
    address: string
}
