"use client";

import Link from "next/link";
import { Course } from "@/types";

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    const discount = course.originalPrice
        ? Math.round((1 - course.price / course.originalPrice) * 100)
        : 0;

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            {/* Header com gradiente */}
            <div className="h-48 primary-gradient relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-20">
                        {course.instructor.avatar}
                    </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                    {discount > 0 && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                            -{discount}%
                        </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {course.category}
                    </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span>⭐ {course.rating}</span>
                        <span>•</span>
                        <span>
                            👥 {course.students.toLocaleString("pt-BR")} alunos
                        </span>
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
                <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium mb-3">
                        {course.level}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {course.shortDescription}
                    </p>
                </div>

                {/* Características */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>📚</span>
                        <span>{course.modules.length} módulos</span>
                    </div>
                </div>

                {/* Preço e ação */}
                <div className="flex items-end justify-between">
                    <div>
                        {course.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                R${" "}
                                {course.originalPrice
                                    .toFixed(2)
                                    .replace(".", ",")}
                            </p>
                        )}
                        <p className="text-3xl font-bold text-orange-600">
                            R$ {course.price.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-xs text-gray-500">
                            ou 12x de R${" "}
                            {(course.price / 12).toFixed(2).replace(".", ",")}
                        </p>
                    </div>
                    <Link
                        href={`/curso/${course.slug}`}
                        className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        Ver Curso
                    </Link>
                </div>
            </div>

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
