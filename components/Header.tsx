"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header className="glass-effect shadow-lg px-6 py-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group"
                    >
                        <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                            <span className="text-white text-2xl">🎓</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold font-display bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                Educação Brasil
                            </span>
                            <p className="text-xs text-gray-600">
                                Transformando vidas através da educação
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-orange-500">🛡️</span>
                        <span>Pagamento Seguro</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-effect {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.8);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                .primary-gradient {
                    background: linear-gradient(
                        135deg,
                        #ff6b35 0%,
                        #f7931e 100%
                    );
                }
            `}</style>
        </header>
    );
}
