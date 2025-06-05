import React from 'react';

export default function Blog() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
      padding: '80px 24px 32px 24px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '18px',
        boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
        padding: '40px 32px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#111',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          Blog
        </h1>
        <article style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#222', marginBottom: '10px' }}>
            Blog Post Title
          </h2>
          <div style={{ color: '#888', fontSize: '0.98rem', marginBottom: '18px' }}>Month Year</div>
          <div style={{
            width: '100%',
            minHeight: '120px',
            background: 'linear-gradient(90deg, #f3f3f3 60%, #e9e9e9 100%)',
            borderRadius: '12px',
            marginBottom: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#bbb',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}>
            [TODO: ADD]
          </div>
        </article>
      </div>
    </div>
  );
} 