import { useState } from 'react';
import clsx from 'clsx';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Section } from './Section';
import { Heading, Text } from './Typography';
import { Button } from './Button';
import { 
  Padding, 
  ShadowSize, 
  shadowMap, 
  Rounded, 
  roundedMap, 
  GradientConfig 
} from '../types';

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[]; // for select type
  rows?: number; // for textarea
}

interface ContactProps {
  title?: string;
  subtitle?: string;
  fields?: FormField[];
  contactInfo?: ContactInfo[];
  submitText?: string;
  successMessage?: string;
  bgColor?: string;
  textColor?: string;
  formBgColor?: string;
  formShadow?: ShadowSize;
  formRounded?: Rounded;
  inputBgColor?: string;
  inputBorderColor?: string;
  inputFocusColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  paddingY?: Padding;
  variant?: 'simple' | 'split' | 'card' | 'minimal';
  showContactInfo?: boolean;
  gradient?: GradientConfig;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  className?: string;
}

const defaultFields: FormField[] = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
  { name: 'subject', label: 'Subject', type: 'select', options: ['General Inquiry', 'Support', 'Sales', 'Partnership'], required: true },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'How can we help you?', required: true, rows: 4 },
];

const defaultContactInfo: ContactInfo[] = [
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: '123 Main St, City, Country' },
  { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon-Fri 9am-5pm' },
];

export function Contact({
  title = 'Get in Touch',
  subtitle = 'Have a question or want to work together? Fill out the form below and we\'ll get back to you as soon as possible.',
  fields = defaultFields,
  contactInfo = defaultContactInfo,
  submitText = 'Send Message',
  successMessage = 'Thank you! Your message has been sent successfully.',
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  formBgColor = 'bg-white',
  formShadow = 'lg',
  formRounded = 'xl',
  inputBgColor = 'bg-gray-50',
  inputBorderColor = 'border-gray-300',
  inputFocusColor = 'focus:border-blue-500 focus:ring-blue-500',
  buttonBgColor = 'bg-blue-600 hover:bg-blue-700',
  buttonTextColor = 'text-white',
  paddingY = 'xl',
  variant = 'split',
  showContactInfo = true,
  gradient,
  onSubmit,
  className,
}: ContactProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (onSubmit) {
      await onSubmit(formData);
    } else {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderField = (field: FormField) => {
    const baseInputClasses = clsx(
      'w-full px-4 py-3 rounded-lg border transition-colors',
      inputBgColor,
      inputBorderColor,
      inputFocusColor,
      'focus:outline-none focus:ring-2'
    );

    if (field.type === 'textarea') {
      return (
        <textarea
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows || 4}
          onChange={handleChange}
          className={clsx(baseInputClasses, 'resize-none')}
        />
      );
    }

    if (field.type === 'select') {
      return (
        <select
          name={field.name}
          required={field.required}
          onChange={handleChange}
          className={baseInputClasses}
          defaultValue=""
        >
          <option value="" disabled>Select an option</option>
          {field.options?.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        onChange={handleChange}
        className={baseInputClasses}
      />
    );
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <Text fontSize="lg" className="text-green-600 font-medium">{successMessage}</Text>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.filter(f => f.type !== 'textarea').map((field, index) => (
              <div key={index} className={field.type === 'select' ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
          
          {fields.filter(f => f.type === 'textarea').map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <Button
            bgColor={buttonBgColor}
            textColor={buttonTextColor}
            fullWidth
            disabled={isSubmitting}
            className="mt-2 cursor-pointer"
          >
            {isSubmitting ? 'Sending...' : submitText}
          </Button>
        </>
      )}
    </form>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      {contactInfo.map((info, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
            {info.icon}
          </div>
          <div>
            <Text fontSize="sm" textColor="text-gray-500" className="mb-1">{info.label}</Text>
            {info.href ? (
              <a href={info.href} className="text-gray-900 hover:text-blue-600 transition-colors font-medium">
                {info.value}
              </a>
            ) : (
              <Text fontWeight="medium">{info.value}</Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <Heading as="h2" fontSize="3xl" fontWeight="bold" textAlign="center" className="mb-4">
              {title}
            </Heading>
            <Text textAlign="center" textColor="text-gray-600">
              {subtitle}
            </Text>
          </div>
          {renderForm()}
        </div>
      </Section>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Heading as="h2" fontSize="3xl" fontWeight="bold" textAlign="center" className="mb-4">
              {title}
            </Heading>
            <Text textAlign="center" textColor="text-gray-600">
              {subtitle}
            </Text>
          </div>
          
          <div className={clsx('p-8', formBgColor, shadowMap[formShadow], roundedMap[formRounded])}>
            {renderForm()}
          </div>

          {showContactInfo && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {contactInfo.map((info, index) => (
                <div key={index}>
                  <div className="w-10 h-10 mx-auto bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                    {info.icon}
                  </div>
                  <Text fontSize="sm" textColor="text-gray-500" className="mb-1">{info.label}</Text>
                  {info.href ? (
                    <a href={info.href} className="text-sm text-gray-900 hover:text-blue-600 transition-colors font-medium">
                      {info.value}
                    </a>
                  ) : (
                    <Text fontSize="sm" fontWeight="medium">{info.value}</Text>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    );
  }

  // Simple variant
  if (variant === 'simple') {
    return (
      <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
        <div className="text-center mb-12">
          <Heading as="h2" fontSize="4xl" fontWeight="bold" textAlign="center" className="mb-4">
            {title}
          </Heading>
          <Text fontSize="lg" textAlign="center" textColor="text-gray-600" className="max-w-2xl mx-auto">
            {subtitle}
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {renderForm()}
          </div>
          
          {showContactInfo && (
            <div className="lg:border-l lg:pl-12 border-gray-200">
              <Heading as="h3" fontSize="xl" fontWeight="semibold" className="mb-6">
                Contact Information
              </Heading>
              {renderContactInfo()}
            </div>
          )}
        </div>
      </Section>
    );
  }

  // Split variant (default)
  return (
    <Section bgColor={bgColor} textColor={textColor} paddingY={paddingY} gradient={gradient} className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left side - Info */}
        <div>
          <Heading as="h2" fontSize="4xl" fontWeight="bold" className="mb-4">
            {title}
          </Heading>
          <Text fontSize="lg" textColor="text-gray-600" className="mb-8">
            {subtitle}
          </Text>

          {showContactInfo && (
            <>
              <div className="h-px bg-gray-200 my-8" />
              {renderContactInfo()}
            </>
          )}
        </div>

        {/* Right side - Form */}
        <div className={clsx('p-8', formBgColor, shadowMap[formShadow], roundedMap[formRounded])}>
          {renderForm()}
        </div>
      </div>
    </Section>
  );
}

// Standalone contact form (no section wrapper)
interface ContactFormProps {
  fields?: FormField[];
  submitText?: string;
  successMessage?: string;
  inputBgColor?: string;
  inputBorderColor?: string;
  inputFocusColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  className?: string;
}

export function ContactForm({
  fields = defaultFields,
  submitText = 'Send Message',
  successMessage = 'Thank you! Your message has been sent successfully.',
  inputBgColor = 'bg-gray-50',
  inputBorderColor = 'border-gray-300',
  inputFocusColor = 'focus:border-blue-500 focus:ring-blue-500',
  buttonBgColor = 'bg-blue-600 hover:bg-blue-700',
  buttonTextColor = 'text-white',
  onSubmit,
  className,
}: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (onSubmit) {
      await onSubmit(formData);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const baseInputClasses = clsx(
    'w-full px-4 py-3 rounded-lg border transition-colors',
    inputBgColor,
    inputBorderColor,
    inputFocusColor,
    'focus:outline-none focus:ring-2'
  );

  if (isSubmitted) {
    return (
      <div className={clsx('flex flex-col items-center justify-center py-12 text-center', className)}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <Text fontSize="lg" className="text-green-600 font-medium">{successMessage}</Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('space-y-5', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.filter(f => f.type !== 'textarea').map((field, index) => (
          <div key={index} className={field.type === 'select' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                onChange={handleChange}
                className={baseInputClasses}
                defaultValue=""
              >
                <option value="" disabled>Select an option</option>
                {field.options?.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                className={baseInputClasses}
              />
            )}
          </div>
        ))}
      </div>
      
      {fields.filter(f => f.type === 'textarea').map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
            onChange={handleChange}
            className={clsx(baseInputClasses, 'resize-none')}
          />
        </div>
      ))}

      <Button
        bgColor={buttonBgColor}
        textColor={buttonTextColor}
        fullWidth
        disabled={isSubmitting}
        className="mt-2 cursor-pointer"
      >
        {isSubmitting ? 'Sending...' : submitText}
      </Button>
    </form>
  );
}
