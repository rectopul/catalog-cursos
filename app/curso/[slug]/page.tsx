import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { getCourseBySlug } from "@/lib/data";

export default async function CoursePage({
    params,
}: {
    params: Promise<{ slug: string }>; // O tipo agora é uma Promise
}) {
    // 1. Aguarda a resolução dos parâmetros
    const { slug } = await params;
    // 2. Agora você usa o slug normalmente
    const course = getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    const discount = course.originalPrice
        ? Math.round((1 - course.price / course.originalPrice) * 100)
        : 0;

    const totalLessons = course.modules.reduce(
        (acc, module) => acc + module.lessons,
        0,
    );

    return (
        <div className="min-h-screen">
            <Header />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <span className="mr-2">←</span>
                    <span className="font-medium">Voltar aos Cursos</span>
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Conteúdo Principal */}
                    <div className="lg:col-span-2">
                        {/* Hero do Curso */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                            <div className="h-64 primary-gradient relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-9xl opacity-20">
                                        {course.instructor.avatar}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    {discount > 0 && (
                                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse-orange">
                                            -{discount}%
                                        </span>
                                    )}
                                    <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full font-semibold">
                                        {course.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="mb-6">
                                    <span className="inline-block px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                                        {course.level}
                                    </span>
                                    <h1 className="text-4xl font-bold font-display text-gray-800 mb-4">
                                        {course.title}
                                    </h1>
                                    <p className="text-lg text-gray-600 mb-6">
                                        {course.description}
                                    </p>

                                    {/* Estatísticas */}
                                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">⭐</span>
                                            <span className="font-semibold">
                                                {course.rating}
                                            </span>
                                            <span>
                                                (
                                                {course.students.toLocaleString(
                                                    "pt-BR",
                                                )}{" "}
                                                avaliações)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">👥</span>
                                            <span>
                                                {course.students.toLocaleString(
                                                    "pt-BR",
                                                )}{" "}
                                                alunos
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">⏱️</span>
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">📚</span>
                                            <span>{totalLessons} aulas</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* O que você vai aprender */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <h2 className="text-2xl font-bold font-display text-gray-800 mb-6">
                                O que você vai aprender
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-green-500 text-xl flex-shrink-0">
                                            ✓
                                        </span>
                                        <span className="text-gray-700">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Conteúdo do Curso */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <h2 className="text-2xl font-bold font-display text-gray-800 mb-6">
                                Conteúdo do Curso
                            </h2>
                            <div className="space-y-4">
                                {course.modules.map((module, index) => (
                                    <div
                                        key={module.id}
                                        className="border border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-2">
                                                    Módulo {index + 1}:{" "}
                                                    {module.title}
                                                </h3>
                                                <div className="flex gap-4 text-sm text-gray-600">
                                                    <span>
                                                        📚 {module.lessons}{" "}
                                                        aulas
                                                    </span>
                                                    <span>
                                                        ⏱️ {module.duration}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                                                {index + 1}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instrutor */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold font-display text-gray-800 mb-6">
                                Seu Instrutor
                            </h2>
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-5xl flex-shrink-0">
                                    {course.instructor.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {course.instructor.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {course.instructor.bio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Card de Compra */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                            {/* Preview */}
                            <div className="h-48 primary-gradient rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                                <span className="text-8xl opacity-30">
                                    {course.instructor.avatar}
                                </span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl">
                                            ▶️
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Preço */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-bold text-orange-600">
                                        R${" "}
                                        {course.price
                                            .toFixed(2)
                                            .replace(".", ",")}
                                    </span>
                                    {course.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through">
                                            R${" "}
                                            {course.originalPrice
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">
                                    ou 12x de R${" "}
                                    {(course.price / 12)
                                        .toFixed(2)
                                        .replace(".", ",")}{" "}
                                    sem juros
                                </p>
                            </div>

                            {/* CTA */}
                            <Link
                                href={`/checkout?courseId=${course.id}`}
                                className="w-full block text-center bg-primary-gradient text-white py-4 rounded-xl hover:shadow-lg font-semibold text-lg transition-all duration-200 hover:scale-105 mb-4 animate-pulse-orange"
                            >
                                <span className="mr-2">🔒</span>
                                Comprar Agora
                            </Link>

                            {/* Garantia */}
                            <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                <div className="inline-flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full">
                                    <span>✓</span>
                                    <span className="font-medium">
                                        Garantia de 7 dias
                                    </span>
                                </div>
                            </div>

                            {/* Includes */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-gray-800 mb-4">
                                    Este curso inclui:
                                </h3>
                                {[
                                    { icon: "∞", text: "Acesso vitalício" },
                                    {
                                        icon: "📱",
                                        text: "Acesso mobile e desktop",
                                    },
                                    {
                                        icon: "🎓",
                                        text: "Certificado de conclusão",
                                    },
                                    {
                                        icon: "💬",
                                        text: "Suporte do instrutor",
                                    },
                                    {
                                        icon: "📚",
                                        text: "Materiais para download",
                                    },
                                    { icon: "🎯", text: "Exercícios práticos" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 text-sm text-gray-700"
                                    >
                                        <span className="text-orange-500">
                                            {item.icon}
                                        </span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
