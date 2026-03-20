"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { getCourseById } from "@/lib/data";
import { CheckoutFormData, PaymentFormData } from "@/types";
import { processPayment } from "@/actions/payment";

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");

    const [currentStep, setCurrentStep] = useState(1);
    const [checkoutData, setCheckoutData] = useState<CheckoutFormData | null>(
        null,
    );
    const [paymentData, setPaymentData] = useState<PaymentFormData | null>(
        null,
    );
    const [isCheckoutValid, setIsCheckoutValid] = useState(false);
    const [isPaymentValid, setIsPaymentValid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!courseId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Curso não encontrado
                    </h1>
                    <button
                        onClick={() => router.push("/")}
                        className="primary-gradient text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        Voltar para Home
                    </button>
                </div>
            </div>
        );
    }

    const course = getCourseById(courseId);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Curso não encontrado
                    </h1>
                    <button
                        onClick={() => router.push("/")}
                        className="primary-gradient text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        Voltar para Home
                    </button>
                </div>
            </div>
        );
    }

    const handleCheckoutDataChange = (data: CheckoutFormData) => {
        setCheckoutData(data);
    };

    const handlePaymentDataChange = (data: PaymentFormData) => {
        setPaymentData(data);
    };

    const handleNextStep = () => {
        if (currentStep === 1 && isCheckoutValid) {
            setCurrentStep(2);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePreviousStep = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSubmit = async () => {
        if (!checkoutData || !paymentData || !isPaymentValid) return;

        setIsProcessing(true);
        setError(null);

        try {
            const result = await processPayment(
                checkoutData,
                paymentData,
                course.id,
                course.price,
            );

            if (result.success && result.orderId) {
                router.push(
                    `/sucesso?orderId=${result.orderId}&email=${encodeURIComponent(checkoutData.email)}`,
                );
            } else {
                setError(result.error || "Erro ao processar pagamento");
            }
        } catch (err) {
            setError("Erro ao processar pagamento. Tente novamente.");
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Header />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center px-4 py-2 text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <span className="mr-2">←</span>
                    <span className="font-medium">Voltar</span>
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulário */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                            {/* Elementos decorativos */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-amber-100 rounded-full -ml-12 -mb-12 opacity-50"></div>

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 primary-gradient rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white text-xl">
                                            🛒
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold font-display text-gray-800">
                                            Finalizar Compra
                                        </h1>
                                        <p className="text-gray-600">
                                            Complete os dados para adquirir seu
                                            curso
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                    currentStep >= 1
                                                        ? "bg-orange-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span className="text-white text-sm">
                                                    👤
                                                </span>
                                            </div>
                                            <span
                                                className={`ml-2 text-sm font-medium ${
                                                    currentStep >= 1
                                                        ? "text-orange-600"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                Dados
                                            </span>
                                        </div>
                                        <div
                                            className={`flex-1 h-1 rounded transition-all duration-200 ${
                                                currentStep >= 2
                                                    ? "bg-orange-500"
                                                    : "bg-gray-200"
                                            }`}
                                        ></div>
                                        <div className="flex items-center">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                    currentStep >= 2
                                                        ? "bg-orange-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span className="text-white text-sm">
                                                    💳
                                                </span>
                                            </div>
                                            <span
                                                className={`ml-2 text-sm font-medium ${
                                                    currentStep >= 2
                                                        ? "text-orange-600"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                Pagamento
                                            </span>
                                        </div>
                                        <div
                                            className={`flex-1 h-1 rounded transition-all duration-200 ${
                                                currentStep >= 3
                                                    ? "bg-orange-500"
                                                    : "bg-gray-200"
                                            }`}
                                        ></div>
                                        <div className="flex items-center">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                                                    currentStep >= 3
                                                        ? "bg-orange-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span className="text-white text-sm">
                                                    ✓
                                                </span>
                                            </div>
                                            <span
                                                className={`ml-2 text-sm font-medium ${
                                                    currentStep >= 3
                                                        ? "text-orange-600"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                Concluído
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                        <div className="flex items-center">
                                            <span className="text-red-600 mr-3 text-xl">
                                                ⚠️
                                            </span>
                                            <div>
                                                <h3 className="text-sm font-medium text-red-800">
                                                    Erro no pagamento
                                                </h3>
                                                <p className="mt-1 text-sm text-red-700">
                                                    {error}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 1: Contact Information */}
                                {currentStep === 1 && (
                                    <div className="animate-slide-in">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                            <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                1
                                            </span>
                                            Informações de Contato
                                        </h2>
                                        <CheckoutForm
                                            onDataChange={
                                                handleCheckoutDataChange
                                            }
                                            onValidationChange={
                                                setIsCheckoutValid
                                            }
                                        />

                                        <div className="mt-8 flex justify-end">
                                            <button
                                                onClick={handleNextStep}
                                                disabled={!isCheckoutValid}
                                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                                    isCheckoutValid
                                                        ? "primary-gradient text-white hover:shadow-lg hover:scale-105"
                                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            >
                                                Continuar para Pagamento
                                                <span className="ml-2">→</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Payment */}
                                {currentStep === 2 && (
                                    <div className="animate-slide-in">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                            <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                2
                                            </span>
                                            Dados do Cartão de Crédito
                                        </h2>
                                        <PaymentForm
                                            onDataChange={
                                                handlePaymentDataChange
                                            }
                                            onValidationChange={
                                                setIsPaymentValid
                                            }
                                        />

                                        <div className="mt-8 flex justify-between">
                                            <button
                                                onClick={handlePreviousStep}
                                                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                                            >
                                                <span className="mr-2">←</span>
                                                Voltar
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={
                                                    !isPaymentValid ||
                                                    isProcessing
                                                }
                                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                                    isPaymentValid &&
                                                    !isProcessing
                                                        ? "primary-gradient text-white hover:shadow-lg hover:scale-105 animate-pulse-orange"
                                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className="inline-block animate-spin mr-2">
                                                            ⟳
                                                        </span>
                                                        Processando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="mr-2">
                                                            🔒
                                                        </span>
                                                        Finalizar Compra
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delivery Method */}
                        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    ℹ️
                                </span>
                                Método de Entrega
                            </h2>
                            <div className="p-4 border-2 border-orange-200 rounded-xl bg-orange-50 relative">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-orange-600 text-lg">
                                            🌐
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Acesso Online
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Imediato após aprovação do pagamento
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className="text-orange-500">✓</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummary
                            course={course}
                            customerData={checkoutData || undefined}
                        />
                    </div>
                </div>
            </main>

            <style jsx>{`
                .primary-gradient {
                    background: linear-gradient(
                        135deg,
                        #ff6b35 0%,
                        #f7931e 100%
                    );
                }
            `}</style>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin text-4xl mb-4">
                            ⟳
                        </div>
                        <p className="text-gray-600">Carregando...</p>
                    </div>
                </div>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}
