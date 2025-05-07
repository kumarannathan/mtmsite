import { useLanguage } from '../LanguageContext';
import i18n from '../i18n';

export default function About() {
  const { lang } = useLanguage();
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'hsla(0,100%,50%,1)',
      backgroundImage: `
        radial-gradient(at 40% 20%, hsla(27,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(186,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
        radial-gradient(at 80% 50%, hsla(340,0%,100%,1) 0px, transparent 50%),
        radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
        radial-gradient(at 84% 62%, hsla(132,100%,70%,1) 0px, transparent 50%),
        radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`,
      fontFamily: 'Inter, Arial, sans-serif',
    }}>
      {/* Header Section */}
      <section style={{ 
        padding: '80px 24px 32px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{ 
            fontFamily: 'Inter, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#111',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}>
            {lang === 'en' ? 'About MTM' : 'Acerca de MTM'}
          </h1>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#ec1c24',
            margin: '0 auto 32px',
            borderRadius: '2px',
          }}></div>
          <p style={{ 
            fontSize: '1.18rem',
            lineHeight: 1.6,
            color: '#222',
            marginBottom: '0',
            fontWeight: 400,
          }}>
            {lang === 'en' 
              ? 'MTM is a holistic wellness experience focused on scalp care, mental clarity, and cultural wellness rituals.' 
              : 'MTM es una experiencia holística de bienestar centrada en el cuidado del cuero cabelludo, la claridad mental y los rituales de bienestar cultural.'}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        padding: '40px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            padding: '32px 28px',
          }}>
            <h2 style={{
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: '#111',
              marginBottom: '24px'
            }}>
              {lang === 'en' ? 'Our Story' : 'Nuestra Historia'}
            </h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: '#ec1c24',
              marginBottom: '24px',
              borderRadius: '2px'
            }}></div>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#444',
              marginBottom: '24px'
            }}>
              {lang === 'en' 
                ? 'Founded in Mexico City, MTM was born from a fusion of traditional healing practices and modern wellness techniques. Our founders recognized the deep connection between scalp health and mental wellbeing, creating a sanctuary where ancient rituals meet contemporary science.' 
                : 'Fundada en la Ciudad de México, MTM nació de una fusión entre prácticas curativas tradicionales y técnicas modernas de bienestar. Nuestros fundadores reconocieron la profunda conexión entre la salud del cuero cabelludo y el bienestar mental, creando un santuario donde los rituales antiguos se encuentran con la ciencia contemporánea.'}
            </p>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#444'
            }}>
              {lang === 'en'
                ? 'Today, we continue to honor these connections, offering transformative experiences that nurture both body and mind. Each therapy is designed to create a unique journey of relaxation, rejuvenation, and self-discovery.'
                : 'Hoy, continuamos honrando estas conexiones, ofreciendo experiencias transformadoras que nutren tanto el cuerpo como la mente. Cada terapia está diseñada para crear un viaje único de relajación, rejuvenecimiento y autodescubrimiento.'}
            </p>
          </div>
          <div style={{
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            height: '400px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'url(https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '40px 24px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
          padding: '40px 32px',
          marginBottom: '40px',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'Inter, Arial, sans-serif',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#111',
            marginBottom: '24px'
          }}>
            {lang === 'en' ? 'Our Values' : 'Nuestros Valores'}
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: '#ec1c24',
            margin: '0 auto 32px',
            borderRadius: '2px'
          }}></div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {/* Value 1 */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            padding: '32px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 36px rgba(44,44,84,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 32px rgba(44,44,84,0.10)';
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              background: 'rgba(236, 28, 36, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              fontSize: '24px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17L12 10M12 7V7" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ec1c24" strokeWidth="2"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111'
            }}>
              {lang === 'en' ? 'Holistic Wellbeing' : 'Bienestar Holístico'}
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#444'
            }}>
              {lang === 'en'
                ? 'We believe in treating the whole person, recognizing the intricate connections between physical, mental, and emotional health.'
                : 'Creemos en tratar a la persona en su totalidad, reconociendo las intrincadas conexiones entre la salud física, mental y emocional.'}
            </p>
          </div>
          
          {/* Value 2 */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            padding: '32px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 36px rgba(44,44,84,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 32px rgba(44,44,84,0.10)';
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              background: 'rgba(236, 28, 36, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              fontSize: '24px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ec1c24" strokeWidth="2"/>
                <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 9H9.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 9H15.01" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111'
            }}>
              {lang === 'en' ? 'Natural Approach' : 'Enfoque Natural'}
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#444'
            }}>
              {lang === 'en'
                ? 'We prioritize natural ingredients and techniques, harnessing the healing power of nature in every treatment we offer.'
                : 'Priorizamos los ingredientes y técnicas naturales, aprovechando el poder curativo de la naturaleza en cada tratamiento que ofrecemos.'}
            </p>
          </div>
          
          {/* Value 3 */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: '22px',
            padding: '32px',
            boxShadow: '0 4px 32px rgba(44,44,84,0.10)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 36px rgba(44,44,84,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 32px rgba(44,44,84,0.10)';
          }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              background: 'rgba(236, 28, 36, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              fontSize: '24px'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ec1c24" strokeWidth="2"/>
                <path d="M7.5 12H16.5" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 7.5V16.5" stroke="#ec1c24" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111'
            }}>
              {lang === 'en' ? 'Cultural Respect' : 'Respeto Cultural'}
            </h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#444'
            }}>
              {lang === 'en'
                ? 'We draw inspiration from diverse cultural traditions, honoring their origins while creating an inclusive experience for all.'
                : 'Nos inspiramos en diversas tradiciones culturales, honrando sus orígenes mientras creamos una experiencia inclusiva para todos.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 