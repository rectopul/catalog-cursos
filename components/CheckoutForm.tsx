'use client';

import { useState, ChangeEvent } from 'react';
import { CheckoutFormData } from '@/types';

interface CheckoutFormProps {
  onDataChange: (data: CheckoutFormData) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function CheckoutForm({ onDataChange, onValidationChange }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    surname: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({});

  const validateField = (name: keyof CheckoutFormData, value: string): string => {
    switch (name) {
      case 'name':
      case 'surname':
        return value.length < 2 ? `${name === 'name' ? 'Nome' : 'Sobrenome'} deve ter pelo menos 2 caracteres` : '';
      case 'phone':
        const phoneNumbers = value.replace(/\D/g, '');
        return phoneNumbers.length < 10 || phoneNumbers.length > 11
          ? 'Telefone deve ter 10 ou 11 dígitos'
          : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'E-mail inválido' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const name = id as keyof CheckoutFormData;

    let formattedValue = value;

    // Formatar telefone
    if (name === 'phone') {
      const numbers = value.replace(/\D/g, '');
      if (numbers.length <= 11) {
        formattedValue = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        if (numbers.length <= 10) {
          formattedValue = numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
      } else {
        return;
      }
    }

    const newFormData = { ...formData, [name]: formattedValue };
    setFormData(newFormData);
    onDataChange(newFormData);

    // Validar em tempo real se o campo já foi tocado
    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    // Verificar se todos os campos são válidos
    const allErrors = Object.keys(newFormData).reduce((acc, key) => {
      const fieldName = key as keyof CheckoutFormData;
      const error = validateField(fieldName, newFormData[fieldName]);
      if (error) acc[fieldName] = error;
      return acc;
    }, {} as Partial<Record<keyof CheckoutFormData, string>>);

    onValidationChange(Object.keys(allErrors).length === 0 && 
      Object.values(newFormData).every(v => v.trim() !== ''));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const name = id as keyof CheckoutFormData;

    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              👤
            </span>
            <input
              type="text"
              id="name"
              placeholder="Seu primeiro nome"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.name && touched.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Sobrenome */}
        <div className="space-y-2">
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
            Sobrenome *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              👤
            </span>
            <input
              type="text"
              id="surname"
              placeholder="Seu sobrenome"
              value={formData.surname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.surname && touched.surname
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
            />
          </div>
          {errors.surname && touched.surname && (
            <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            WhatsApp *
          </label>
          <div className="flex">
            <div className="flex items-center px-4 py-3 border border-gray-300 rounded-l-xl bg-gray-50">
              <span className="text-2xl mr-2">🇧🇷</span>
              <span className="text-sm font-medium text-gray-700">+55</span>
            </div>
            <input
              type="tel"
              id="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`flex-1 px-4 py-3 border border-l-0 rounded-r-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.phone && touched.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              ✉️
            </span>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.email && touched.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}
