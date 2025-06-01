'use client';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

export default function Button({ href, onClick, children, variant = 'secondary', style }: ButtonProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
    } else {
      e.currentTarget.style.backgroundColor = 'var(--gray-3)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const baseStyles = {
    display: 'flex',
    justifyContent: 'center',
    border: variant === 'primary' ? '1px solid var(--accent-blue)' : '1px solid var(--gray-3)',
    borderRadius: '6px',
    transition: 'background-color 0.15s',
    fontSize: '16px',
    padding: '10px 20px',
    textDecoration: 'none',
    color: 'var(--gray-9)',
    fontFamily: 'var(--font-geist-mono), monospace',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    ...style
  };

  if (onClick) {
    return (
      <button
        style={baseStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}
