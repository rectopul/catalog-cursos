import Header from "@/components/Header";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/lib/data";

export default function Home() {
    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 animate-slide-up">
                        <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                            Transforme Sua Carreira
                        </h1>
                        <p className="text-xl text-gray-700 mb-4 max-w-2xl mx-auto">
                            Aprenda com os melhores cursos online do Brasil e
                            conquiste seus objetivos profissionais
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span>Certificado Reconhecido</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span>Acesso Vitalício</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span>Suporte Dedicado</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                        {[
                            {
                                icon: "👨‍🎓",
                                value: "50K+",
                                label: "Alunos Ativos",
                            },
                            {
                                icon: "📚",
                                value: "100+",
                                label: "Cursos Disponíveis",
                            },
                            {
                                icon: "⭐",
                                value: "4.9",
                                label: "Avaliação Média",
                            },
                            {
                                icon: "🎓",
                                value: "95%",
                                label: "Taxa de Conclusão",
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold text-orange-600 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold font-display text-gray-800 mb-4">
                            Nossos Cursos em Destaque
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Escolha entre nossa seleção de cursos cuidadosamente
                            elaborados por especialistas
                        </p>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-primary-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full -ml-24 -mb-24"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold font-display mb-4">
                                Pronto para Começar?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Junte-se a milhares de alunos que já
                                transformaram suas carreiras
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
                                    Ver Todos os Cursos
                                </button>
                                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200">
                                    Falar com Especialista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-6">
                        <span
                            className="text-3xl font-bold font-display bg-linear-to-r
 from-orange-400 to-amber-400 bg-clip-text text-transparent"
                        >
                            Educação Brasil
                        </span>
                    </div>
                    <p className="text-gray-400 mb-4">
                        Transformando vidas através da educação de qualidade
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-gray-400">
                        <a
                            href="#"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Termos de Uso
                        </a>
                        <span>•</span>
                        <a
                            href="#"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Política de Privacidade
                        </a>
                        <span>•</span>
                        <a
                            href="#"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Contato
                        </a>
                    </div>
                    <p className="text-gray-500 text-sm mt-6">
                        © 2024 Educação Brasil. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
