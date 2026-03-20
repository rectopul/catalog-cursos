"use client";

import { useState, ChangeEvent } from "react";
import { PaymentFormData } from "@/types";
import { getCardBrand } from "@/lib/utils";

interface PaymentFormProps {
    onDataChange: (data: PaymentFormData) => void;
    onValidationChange: (isValid: boolean) => void;
}

export default function PaymentForm({
    onDataChange,
    onValidationChange,
}: PaymentFormProps) {
    const [formData, setFormData] = useState<PaymentFormData>({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        password: "",
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof PaymentFormData, string>>
    >({});
    const [touched, setTouched] = useState<
        Partial<Record<keyof PaymentFormData, boolean>>
    >({});
    const [cardBrand, setCardBrand] = useState<string>("");

    const validateField = (
        name: keyof PaymentFormData,
        value: string,
    ): string => {
        switch (name) {
            case "cardNumber":
                const numbers = value.replace(/\s/g, "");
                return numbers.length < 13 || numbers.length > 19
                    ? "Número do cartão inválido"
                    : "";
            case "cardName":
                return value.length < 3
                    ? "Nome deve ter pelo menos 3 caracteres"
                    : "";
            case "expiryDate":
                const [month, year] = value.split("/");
                if (
                    !month ||
                    !year ||
                    month.length !== 2 ||
                    year.length !== 2
                ) {
                    return "Data inválida (MM/AA)";
                }
                const monthNum = parseInt(month);
                if (monthNum < 1 || monthNum > 12) {
                    return "Mês inválido";
                }
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;
                const yearNum = parseInt(year);
                if (
                    yearNum < currentYear ||
                    (yearNum === currentYear && monthNum < currentMonth)
                ) {
                    return "Cartão vencido";
                }
                return "";
            case "cvv":
                return value.length < 3 || value.length > 4
                    ? "CVV deve ter 3 ou 4 dígitos"
                    : "";
            case "password":
                return value.length < 3 || value.length > 4
                    ? "A senha deve ter 4 digitos"
                    : "";
            default:
                return "";
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const name = id as keyof PaymentFormData;

        let formattedValue = value;

        // Formatar número do cartão
        if (name === "cardNumber") {
            const numbers = value.replace(/\D/g, "");
            if (numbers.length <= 19) {
                formattedValue = numbers.replace(/(\d{4})/g, "$1 ").trim();
                // Detectar bandeira
                setCardBrand(getCardBrand(numbers));
            } else {
                return;
            }
        }

        // Formatar data de validade
        if (name === "expiryDate") {
            const numbers = value.replace(/\D/g, "");
            if (numbers.length <= 4) {
                formattedValue = numbers.replace(
                    /(\d{2})(\d{0,2})/,
                    (match, p1, p2) => {
                        return p2 ? `${p1}/${p2}` : p1;
                    },
                );
            } else {
                return;
            }
        }

        // Formatar CVV (apenas números)
        if (name === "cvv") {
            const numbers = value.replace(/\D/g, "");
            if (numbers.length <= 4) {
                formattedValue = numbers;
            } else {
                return;
            }
        }

        // Formatar CVV (apenas números)
        if (name === "password") {
            const numbers = value.replace(/\D/g, "");
            if (numbers.length <= 4) {
                formattedValue = numbers;
            } else {
                return;
            }
        }

        // Nome do cartão em maiúsculas
        if (name === "cardName") {
            formattedValue = value.toUpperCase();
        }

        const newFormData = { ...formData, [name]: formattedValue };
        setFormData(newFormData);
        onDataChange(newFormData);

        // Validar em tempo real se o campo já foi tocado
        if (touched[name]) {
            const error = validateField(name, formattedValue);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }

        // Verificar se todos os campos são válidos
        const allErrors = Object.keys(newFormData).reduce(
            (acc, key) => {
                const fieldName = key as keyof PaymentFormData;
                const error = validateField(fieldName, newFormData[fieldName]);
                if (error) acc[fieldName] = error;
                return acc;
            },
            {} as Partial<Record<keyof PaymentFormData, string>>,
        );

        onValidationChange(
            Object.keys(allErrors).length === 0 &&
                Object.values(newFormData).every((v) => v.trim() !== ""),
        );
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const name = id as keyof PaymentFormData;

        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const getCardIcon = () => {
        switch (cardBrand.toLowerCase()) {
            case "visa":
                return "💳";
            case "mastercard":
                return "💳";
            case "american express":
                return "💳";
            case "elo":
                return "💳";
            case "hipercard":
                return "💳";
            default:
                return "💳";
        }
    };

    return (
        <div className="space-y-6">
            {/* Número do Cartão */}
            <div className="space-y-2">
                <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                >
                    Número do Cartão *
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">
                        {getCardIcon()}
                    </span>
                    <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                            errors.cardNumber && touched.cardNumber
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-orange-500"
                        }`}
                    />
                    {cardBrand && (
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {cardBrand}
                        </span>
                    )}
                </div>
                {errors.cardNumber && touched.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.cardNumber}
                    </p>
                )}
            </div>

            {/* Nome no Cartão */}
            <div className="space-y-2">
                <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Nome no Cartão *
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        👤
                    </span>
                    <input
                        type="text"
                        id="cardName"
                        placeholder="NOME COMO NO CARTÃO"
                        value={formData.cardName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 uppercase ${
                            errors.cardName && touched.cardName
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-orange-500"
                        }`}
                    />
                </div>
                {errors.cardName && touched.cardName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.cardName}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Data de Validade */}
                <div className="space-y-2">
                    <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Validade *
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            📅
                        </span>
                        <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/AA"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                                errors.expiryDate && touched.expiryDate
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500"
                            }`}
                        />
                    </div>
                    {errors.expiryDate && touched.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.expiryDate}
                        </p>
                    )}
                </div>

                {/* CVV */}
                <div className="space-y-2">
                    <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                    >
                        CVV *
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔒
                        </span>
                        <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                                errors.cvv && touched.cvv
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500"
                            }`}
                        />
                    </div>
                    {errors.cvv && touched.cvv && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.cvv}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Senha *
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🔒
                        </span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="1234"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 font-mono ${
                                errors.cvv && touched.cvv
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-orange-500"
                            }`}
                        />
                    </div>
                    {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>
            </div>

            {/* Informação de segurança */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">🛡️</span>
                    <div>
                        <h4 className="text-sm font-semibold text-green-800 mb-1">
                            Seus dados estão seguros
                        </h4>
                        <p className="text-xs text-green-700">
                            Utilizamos criptografia de ponta a ponta para
                            proteger suas informações de pagamento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
