'use client';

import { Course } from '@/types';
import { CheckoutFormData } from '@/types';

interface OrderSummaryProps {
  course: Course;
  customerData?: CheckoutFormData;
}

export default function OrderSummary({ course, customerData }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 animate-float">
      {/* Cartão Virtual */}
      <div className="card-gradient rounded-2xl p-6 text-white mb-6 relative overflow-hidden shadow-orange">
        <div className="absolute top-4 right-4 text-2xl opacity-70">
          💳
        </div>
        <div className="absolute top-4 left-4 text-2xl">
          🎓
        </div>
        <div className="mt-8 mb-6">
          <div className="text-sm opacity-80 mb-2">Curso Selecionado</div>
          <div className="text-lg font-semibold mb-4 leading-tight">
            {course.title}
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-80">Aluno</div>
            <div className="text-lg font-mono">
              {customerData?.name && customerData?.surname
                ? `${customerData.name} ${customerData.surname}`
                : 'Informe seu nome'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">Contato</div>
            <div className="text-sm">
              {customerData?.phone
                ? `+55 ${customerData.phone}`
                : 'Informe seu telefone'}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mb-16"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white bg-opacity-5 rounded-full -ml-10 -mb-10"></div>
      </div>

      {/* Info do Curso */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-medium">
          <span className="mr-2">🎓</span>
          <span>{course.category}</span>
        </div>
      </div>

      {/* Resumo */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-800 mb-2">1 Curso</div>
        <div className="text-gray-600">Acesso vitalício</div>
      </div>

      {/* Detalhes do Preço */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800 font-semibold">
            R$ {course.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Taxa de entrega</span>
          <span className="text-green-600 font-semibold">Grátis</span>
        </div>
        {course.originalPrice && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Desconto</span>
            <span className="text-green-600 font-semibold">
              R$ {(course.originalPrice - course.price).toFixed(2).replace('.', ',')}
            </span>
          </div>
        )}
        <hr className="my-4 border-gray-200" />
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-800">Total</span>
          <span className="text-orange-600">
            R$ {course.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* Garantia */}
      <div className="mt-4 text-center border-t border-gray-200 pt-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
          <span className="text-green-500">✓</span>
          <span>Pagamento 100% seguro</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span className="text-green-500">✓</span>
          <span>Garantia de 7 dias</span>
        </div>
      </div>

      <style jsx>{`
        .card-gradient {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff8c42 100%);
        }
        .shadow-orange {
          box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
