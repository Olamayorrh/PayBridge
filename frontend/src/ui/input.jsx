import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react';

export const Input = ({
  placeholder,
  type = 'text',
  required = false,
  name,
  size,
  extra,
  icon,
  error,
  touched,
  autoComplete = 'off',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const currentType = isPasswordField ? (showPassword ? 'text' : 'password') : type;
  const Icon = icon;

  const defaultStyles =
    'box-border rounded-xl h-[3rem] bg-white/15 text-[#94A3B8] font-inter outline-none transition-colors focus:border-[#FCC003]';
  const sizes = {
    sm: 'w-full',
    md: 'w-full',
    lg: 'w-full',
  };
  const extraStyles = {
    base: ' pl-[2.5rem]',
    grid: 'col-span-1 ',
  };
  const showError = touched && error;

  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
        )}
        <input
          {...props}
          className={`${defaultStyles} ${sizes[size] || ''} ${icon ? 'pl-12' : 'pl-4'} ${
            extra ? extraStyles[extra] : ''
          } ${isPasswordField ? 'pr-10' : 'pr-4'} ${
            showError ? 'border border-red-400' : 'border border-transparent'
          } ${props.className}`}
          placeholder={placeholder}
          type={currentType}
          required={required}
          name={name}
          autoComplete={autoComplete}
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none flex items-center justify-center p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
          </button>
        )}
      </div>
      {showError && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
};
