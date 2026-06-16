export const Button = ({
  children,
  variant,
  size,
  background,
  color,
  type = 'submit',
  disabled,
  className = ' ',
  ...props
}) => {
  const baseStyles = 'rounded-[10px]';
  const variants = {
    default: 'border-none text-white/50',
    primary: 'bg-[#FCC003] text-black rounded-xl flex items-center justify-center gap-1',
    secondary: 'bg-white/15 text-white/50 rounded-xl ',
    transparent: ' bg-white/50 flex items-center gap-1 w-[12rem] h-[3.5rem] justify-center',
  };

  const sizes = {
    sm: 'py-1  px-4',
    xl: 'py-2.5 w-full',
    md: 'px-5 py-2',
    lg: 'h-[2.5rem] w-[21.1rem]',
    xxl: 'h-[3rem] w-full',
  };

  const backgrounds = {
    colorPrimary: 'bg-[#FCC003]',
  };

  const colors = {
    whiteColor: 'text-[#fff]',
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={` ${baseStyles} ${variants[variant]} ${sizes[size]} ${backgrounds[background]} ${colors[color]} ${className}`}
    >
      {children}
    </button>
  );
};
