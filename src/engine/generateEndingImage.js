import { COVER_IMAGES } from '../data/covers.js';

const W = 1080;
const H = 1920;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Renders the share card to an offscreen canvas and resolves with a
 * Blob (PNG). Caller decides whether to use the Web Share API or fall
 * back to a plain download — this function only handles drawing.
 */
export async function generateEndingImage({ titleId, titleName, endingTag }) {
  // Custom webfonts (Fraunces/Inter) need to actually be loaded before
  // canvas text will pick them up — otherwise it silently falls back
  // to a system font.
  await document.fonts.ready;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background gradient, matching the app's brand palette.
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#241c33');
  grad.addColorStop(0.5, '#17141f');
  grad.addColorStop(1, '#100e18');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // App icon + wordmark, top.
  try {
    const icon = await loadImage('/icon-512.png');
    const iconSize = 96;
    roundRectPath(ctx, W / 2 - iconSize / 2, 140, iconSize, iconSize, 22);
    ctx.save();
    ctx.clip();
    ctx.drawImage(icon, W / 2 - iconSize / 2, 140, iconSize, iconSize);
    ctx.restore();
  } catch {
    // Icon failing to load shouldn't block the rest of the card.
  }

  ctx.fillStyle = '#ece4d6';
  ctx.font = "600 42px 'Fraunces', serif";
  ctx.textAlign = 'center';
  ctx.fillText('Wovenfate', W / 2, 300);

  // Cover art, large rounded card, center.
  const coverSrc = COVER_IMAGES[titleId];
  const coverY = 380;
  const coverSize = 700;
  if (coverSrc) {
    try {
      const cover = await loadImage(coverSrc);
      roundRectPath(ctx, W / 2 - coverSize / 2, coverY, coverSize, coverSize, 28);
      ctx.save();
      ctx.clip();
      // Cover art is a wide (16:9-ish) banner — center-crop to square.
      const scale = Math.max(coverSize / cover.width, coverSize / cover.height);
      const dw = cover.width * scale;
      const dh = cover.height * scale;
      ctx.drawImage(
        cover,
        W / 2 - dw / 2,
        coverY + coverSize / 2 - dh / 2,
        dw, dh
      );
      ctx.restore();
      ctx.strokeStyle = 'rgba(51,41,63,0.9)';
      ctx.lineWidth = 2;
      roundRectPath(ctx, W / 2 - coverSize / 2, coverY, coverSize, coverSize, 28);
      ctx.stroke();
    } catch {
      // Falls through to just showing text below if the cover fails.
    }
  }

  // Title name.
  ctx.fillStyle = '#ece4d6';
  ctx.font = "600 52px 'Fraunces', serif";
  ctx.fillText(titleName, W / 2, coverY + coverSize + 90);

  // The actual payload — ending badge.
  const badgeY = coverY + coverSize + 140;
  ctx.font = "italic 36px 'Fraunces', serif";
  ctx.fillStyle = '#a89dbd';
  ctx.fillText('I chose an ending —', W / 2, badgeY);

  const endingLabel = endingTag.replace(/^Ending:\s*/i, '');
  ctx.font = "700 88px 'Fraunces', serif";
  ctx.fillStyle = '#c97a3d';
  ctx.fillText(endingLabel.toUpperCase(), W / 2, badgeY + 110);

  // Footer CTA.
  ctx.font = "500 34px 'Inter', sans-serif";
  ctx.fillStyle = '#a89dbd';
  ctx.fillText('Choose how your story unfolds.', W / 2, H - 160);
  ctx.font = "600 38px 'Inter', sans-serif";
  ctx.fillStyle = '#ece4d6';
  ctx.fillText('wovenfate.app', W / 2, H - 100);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}
