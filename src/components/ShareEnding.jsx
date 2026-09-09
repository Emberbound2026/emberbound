import { useState } from 'react';
import { generateEndingImage } from '../engine/generateEndingImage.js';

export function ShareEnding({ titleId, titleName, endingTag }) {
  const [status, setStatus] = useState('idle'); // idle | generating | error

  const handleShare = async () => {
    setStatus('generating');
    try {
      const blob = await generateEndingImage({ titleId, titleName, endingTag });
      const file = new File([blob], `${titleId}-ending.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `My Emberbound ending — ${titleName}`,
          text: `I just finished ${titleName} on Emberbound.`,
        });
      } else {
        // Fallback: trigger a plain download. Covers desktop browsers
        // and any mobile browser without Web Share API file support.
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${titleId}-ending.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
      setStatus('idle');
    } catch (err) {
      // AbortError fires when the user just closes the native share
      // sheet without picking anything — not a real error.
      if (err.name !== 'AbortError') {
        console.error('Failed to generate/share ending image:', err);
        setStatus('error');
        return;
      }
      setStatus('idle');
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button className="narrator-btn" onClick={handleShare} disabled={status === 'generating'}>
        {status === 'generating' ? 'Preparing image…' : 'Share your ending'}
      </button>
      {status === 'error' && (
        <p style={{ fontSize: 12, color: 'var(--ember)', marginTop: 8 }}>
          Couldn't create the share image — try again in a moment.
        </p>
      )}
    </div>
  );
}
