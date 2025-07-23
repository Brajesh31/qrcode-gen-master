import styles from '../styles/qrprev.module.css';
import { useState, useCallback } from 'react';

interface QRPrevProps {
    text: string;
    primaryColor: string;
    backgroundColor: string;
}

function QRPrev({ text, primaryColor, backgroundColor }: QRPrevProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Remove the # from color values for the API
    const primaryColorNoHash = primaryColor.replace('#', '');
    const backgroundColorNoHash = backgroundColor.replace('#', '');
    const texthandle = text || 'QR Code Gen Master';
    
    const qrcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(texthandle)}&size=250x250&color=${primaryColorNoHash}&bgcolor=${backgroundColorNoHash}&format=png`;

    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setError(null);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setError('Failed to load QR code');
    }, []);

    const downloadQRCode = useCallback(async () => {
        if (isDownloading) return;
        
        setIsDownloading(true);
        try {
            // Fetch the image as a blob to avoid CORS issues
            const response = await fetch(qrcodeUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch QR code');
            }
            
            const blob = await response.blob();
            
            // Create a blob URL for download
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Create a temporary link element for download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `qrcode-${Date.now()}.png`;
            
            // Add link to DOM, trigger download, then remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the blob URL
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading QR code:', error);
            setError('Failed to download QR code');
        } finally {
            setIsDownloading(false);
        }
    }, [qrcodeUrl, isDownloading]);

    const handleDownload = useCallback(async (event: React.MouseEvent<HTMLImageElement>) => {
        await downloadQRCode();
        
        // Add visual feedback for image click
        const img = event.target as HTMLImageElement;
        if (img) {
            img.style.opacity = '0.7';
            await new Promise(resolve => setTimeout(resolve, 200));
            img.style.opacity = '1';
        }
    }, [downloadQRCode]);

    return (
        <div className={styles.box_qrcode}>
            {isLoading && (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Generating QR Code...</p>
                </div>
            )}
            
            {error && (
                <div className={styles.error}>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}
            
            <img 
                src={qrcodeUrl}
                alt="QR Code"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ 
                    display: (isLoading || error) ? 'none' : 'block', 
                    cursor: isDownloading ? 'not-allowed' : 'pointer',
                    opacity: isDownloading ? 0.7 : 1
                }}
                title={isDownloading ? 'Downloading...' : 'Click to download QR code'}
                onClick={handleDownload}
            />
            
            {/* Download Button */}
            {!isLoading && !error && (
                <button 
                    onClick={downloadQRCode}
                    disabled={isDownloading}
                    style={{
                        marginTop: '10px',
                        padding: '10px 22px',
                        background: 'linear-gradient(90deg, #232526 0%, #1a1a1a 100%)',
                        color: '#fff',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        fontSize: '1rem',
                        transition: 'background 0.2s, box-shadow 0.2s, opacity 0.2s',
                        cursor: isDownloading ? 'not-allowed' : 'pointer',
                        opacity: isDownloading ? 0.7 : 1
                    }}
                >
                    {isDownloading ? 'Downloading...' : '📥 Download QR Code'}
                </button>
            )}
        </div>
    );
}

export default QRPrev;