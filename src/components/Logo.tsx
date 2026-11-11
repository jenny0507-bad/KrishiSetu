import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" 
        alt="KrishiSetu Logo" 
        className={`${sizes[size]} object-contain`}
        referrerPolicy="no-referrer"
      />
      {size !== 'sm' && (
        <h1 className={`font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-agri-green to-accent-color ${size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-3xl' : 'text-xl'}`}>
          KrishiSetu
        </h1>
      )}
    </div>
  );
};

export default Logo;
