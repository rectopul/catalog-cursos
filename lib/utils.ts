export function getCardBrand(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, "");

    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "Mastercard";
    if (/^3[47]/.test(cleaned)) return "Amex";
    // ... outras bandeiras
    return "Mastercard";
}
