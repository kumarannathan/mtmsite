import { useState, useEffect } from 'react';

const messages = [
    "Creating your sanctuary of calm...",
    "Sourcing natural botanicals...",
    "Selecting the finest essential oils...",
    "Optimizing your personalized care...",
    "Harmonizing body and mind...",
    "Preparing your MTM experience..."
];

export default function LoadingScreen() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        setHasEntered(true);
        // Cycle through messages with a very slow, elegant cross-fade
        const messageInterval = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                setMessageIndex((prev) => (prev + 1) % messages.length);
                setOpacity(1);
            }, 800);
        }, 2800);

        return () => clearInterval(messageInterval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fdf9f5', // Warm cream
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: 'Inter, Arial, sans-serif',
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden'
        }}>
            {/* Ambient background glow for 'Cozy' feel */}
            <div style={{
                position: 'absolute',
                width: '150%',
                height: '150%',
                background: 'radial-gradient(circle at center, rgba(209, 185, 129, 0.08) 0%, rgba(253, 249, 245, 0) 60%)',
                animation: 'ambient-breathe 10s infinite ease-in-out',
                pointerEvents: 'none',
                zIndex: 1
            }} />

            {/* Main Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: hasEntered ? 'translateY(0)' : 'translateY(20px)',
                opacity: hasEntered ? 1 : 0,
                transition: 'all 1.5s cubic-bezier(0.2, 0, 0.2, 1)'
            }}>
                {/* Minimalist Logo Layering */}
                <div style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    marginBottom: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Subtle Ring Animation */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        border: '1px solid rgba(27, 77, 62, 0.1)',
                        borderRadius: '50%',
                        transform: 'scale(0.8)',
                        animation: 'ring-expand 4s infinite ease-out'
                    }} />

                    <img
                        src="/logo.png"
                        alt="MTM"
                        style={{
                            width: '45px',
                            height: '45px',
                            objectFit: 'contain',
                            opacity: 0.9,
                            filter: 'sepia(0.2)' // Warm up the logo slightly
                        }}
                    />
                </div>

                {/* Elegant Typography */}
                <div style={{
                    textAlign: 'center',
                    height: '40px'
                }}>
                    <p style={{
                        color: '#1B4D3E',
                        fontSize: '1.2rem',
                        fontFamily: "'Playfair Display', serif", // Premium heading font
                        fontStyle: 'italic',
                        letterSpacing: '0.02em',
                        margin: 0,
                        opacity: opacity,
                        transition: 'opacity 0.8s ease-in-out',
                    }}>
                        {messages[messageIndex]}
                    </p>
                    <div style={{
                        width: '30px',
                        height: '1px',
                        backgroundColor: 'rgba(27, 77, 62, 0.2)',
                        margin: '12px auto 0'
                    }} />
                </div>
            </div>

            {/* Very subtle progress indicator (thin line at the bottom) */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: 'rgba(27, 77, 62, 0.03)'
            }}>
                <div style={{
                    height: '100%',
                    backgroundColor: '#1B4D3E',
                    width: '100%',
                    transformOrigin: 'left',
                    animation: 'fill-elegant 5s linear forwards'
                }} />
            </div>

            <style>{`
        @keyframes ambient-breathe {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.5; }
          50% { transform: scale(1.1) translate(2%, 2%); opacity: 0.8; }
        }
        @keyframes ring-expand {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes fill-elegant {
          0% { transform: scaleX(0); opacity: 0.3; }
          100% { transform: scaleX(1); opacity: 0.05; }
        }
      `}</style>
        </div>
    );
}
