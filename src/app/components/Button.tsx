'use client';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
}

export default function Button({ href, children, variant }: ButtonProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
    } else {
      e.currentTarget.style.backgroundColor = 'var(--gray-3)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        justifyContent: 'center',
        border: variant === 'primary' ? '1px solid var(--accent-blue)' : '1px solid var(--gray-3)',
        borderRadius: '6px',
        transition: 'background-color 0.15s',
        fontSize: '16px',
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'var(--gray-9)',
        fontFamily: 'var(--font-geist-mono), monospace'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}