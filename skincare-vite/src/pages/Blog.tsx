import { theme } from 'antd';
import React, { useEffect } from 'react';

const instagramEmbed = `
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/mtm_wellbeing/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px auto; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/mtm_wellbeing/?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> </a></div></blockquote>
`;

const gridImages = [
  '/img1.jpeg',
  '/img2.jpeg',
  '/img3.jpeg',
  '/img4.jpeg',
];

export default function Blog() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{
      minHeight: '70vh',
      width: '100%',
      background: '#FCFAF7',
      padding: '60px 16px 40px 16px',
      fontFamily: 'Inter, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
           <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 0, 
          marginTop: '2%' 
        }}>
          <span style={{
            background: 'rgba(27,77,62,0.08)',
            color: 'black',
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 999,
            padding: '8px 24px',
            letterSpacing: '0.04em',
            fontFamily: 'Inter, Arial, sans-serif',
            display: 'inline-block',
          }}>
            Stay in touch 
            
          </span>
        </div>
      <h1 style={{
        fontFamily: 'Playfair Display, serif',
        fontWeight: 700,
        fontSize: '2.2rem',
        marginBottom: '18px',
        marginTop: '10px',
        color: '#1B4D3E',
        letterSpacing: '-0.01em',
        textAlign: 'center',
      }}>
        Our Blog
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#2A6B57',
        marginBottom: '32px',
        fontWeight: 400,
        textAlign: 'center',
      }}>
        Follow us on Instagram for the latest updates, inspiration, and spa moments.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          width: '100%',
          maxWidth: 1100,
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: 2x2 grid */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            maxWidth: 540,
            aspectRatio: '1 / 1',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '5px',
            alignSelf: 'flex-start',
          }}
        >
          {gridImages.map((src, i) => (
            <div
              key={src}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#e9ecef',
                boxShadow: '0 2px 12px rgba(44,44,84,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>
        {/* Right: Instagram embed */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            maxWidth: 540,
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{ width: '100%', height: '100%' }}
            dangerouslySetInnerHTML={{ __html: instagramEmbed }}
          />
        </div>
      </div>
    </div>
  );
} 