'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const email = searchParams.get('email');

  if (!orderId || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Informações do pedido não encontradas
          </h1>
          <button
            onClick={() => router.push('/')}
            className="primary-gradient text-white px-6 py-3 rounded-xl font-semibold"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Animation */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
              <span className="text-6xl">✓</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-800 mb-4">
            Pagamento Aprovado! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Sua compra foi processada com sucesso
          </p>
          <p className="text-lg text-gray-500">
            Pedido: <span className="font-mono font-semibold text-orange-600">{orderId}</span>
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email Confirmation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-12 -mt-12 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Confirmação Enviada
              </h2>
              <p className="text-gray-600 mb-4">
                Enviamos um e-mail de confirmação com todos os detalhes do seu pedido para:
              </p>
              <p className="font-semibold text-orange-600 break-all">
                {decodeURIComponent(email)}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -mr-12 -mt-12 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Acesso ao Curso
              </h2>
              <p className="text-gray-600 mb-4">
                Você receberá as instruções de acesso ao curso em até 5 minutos no seu e-mail.
              </p>
              <p className="text-sm text-gray-500">
                Verifique também sua caixa de spam
              </p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold font-display text-gray-800 mb-6 flex items-center">
            <span className="mr-3">📋</span>
            Próximos Passos
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                icon: '📧',
                title: 'Verifique seu e-mail',
                description: 'Enviamos um e-mail com as credenciais de acesso e instruções detalhadas.',
              },
              {
                step: '2',
                icon: '🔐',
                title: 'Faça login na plataforma',
                description: 'Use as credenciais enviadas para acessar a área de membros.',
              },
              {
                step: '3',
                icon: '🎯',
                title: 'Comece seu aprendizado',
                description: 'Assista às aulas, faça os exercícios e conquiste seu certificado!',
              },
              {
                step: '4',
                icon: '💬',
                title: 'Suporte disponível',
                description: 'Nossa equipe está pronta para ajudar no que você precisar.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 mb-12 border-2 border-orange-200">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Informações Importantes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span>O acesso ao curso é <strong>vitalício</strong> - estude no seu ritmo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span>Você tem <strong>7 dias de garantia</strong> - se não gostar, devolvemos seu dinheiro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span>Certificado disponível após conclusão de <strong>70% do curso</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span>Suporte via e-mail e comunidade exclusiva de alunos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 primary-gradient text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <span className="mr-2">🏠</span>
            Voltar para Home
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200"
          >
            <span className="mr-2">🖨️</span>
            Imprimir Comprovante
          </button>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Precisa de ajuda? Entre em contato conosco:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="mailto:suporte@educacaobrasil.com"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>📧</span>
              <span>suporte@educacaobrasil.com</span>
            </a>
            <a
              href="https://wa.me/5511999999999"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <span>📱</span>
              <span>(11) 99999-9999</span>
            </a>
          </div>
        </div>
      </main>

      <style jsx>{`
        .primary-gradient {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl mb-4">⟳</div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
