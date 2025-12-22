import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Flowhub';
    const description = searchParams.get('description') || 'Discover n8n Workflows';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #2a2a2a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #2a2a2a 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px 80px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    {/* Logo placeholder if needed */}
                    <div style={{ fontSize: 72, fontWeight: 900, background: 'linear-gradient(to right, #FF416C, #FF4B2B)', backgroundClip: 'text', color: 'transparent', marginBottom: 20 }}>
                        Flowhub
                    </div>

                    <div
                        style={{
                            fontSize: 48,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: 20,
                            color: '#ffffff',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                    >
                        {title}
                    </div>

                    <div style={{ fontSize: 32, opacity: 0.8, fontWeight: 400 }}>
                        {description}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
