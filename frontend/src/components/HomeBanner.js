import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useBanners } from '../context/BannerContext';
import './HomeBanner.css';

export default function HomeBanner() {
  const { activeBanners } = useBanners();
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [dismissed, setDismissed]     = useState(new Set());
  const [animState, setAnimState]     = useState('visible'); // visible | exit | enter
  const [isPaused,  setIsPaused]      = useState(false);
  const timerRef = useRef(null);

  // banners that haven't been dismissed
  const visible = activeBanners.filter(b => !dismissed.has(b.id));

  const goTo = useCallback((idx, direction = 'next') => {
    setAnimState(`exit-${direction}`);
    setTimeout(() => {
      setCurrentIdx(idx);
      setAnimState(`enter-${direction}`);
      setTimeout(() => setAnimState('visible'), 350);
    }, 300);
  }, []);

  const next = useCallback(() => {
    if (visible.length <= 1) return;
    goTo((currentIdx + 1) % visible.length, 'next');
  }, [currentIdx, visible.length, goTo]);

  const prev = useCallback(() => {
    if (visible.length <= 1) return;
    goTo((currentIdx - 1 + visible.length) % visible.length, 'prev');
  }, [currentIdx, visible.length, goTo]);

  // Auto-advance only for 'sliding' banners
  useEffect(() => {
    clearInterval(timerRef.current);
    if (visible.length <= 1 || isPaused) return;
    const current = visible[currentIdx];
    if (!current || current.displayMode !== 'sliding') return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [visible, currentIdx, isPaused, next]);

  // Keep index in bounds when dismissing
  useEffect(() => {
    if (currentIdx >= visible.length && visible.length > 0) {
      setCurrentIdx(visible.length - 1);
    }
  }, [visible.length, currentIdx]);

  const dismiss = (id) => {
    setDismissed(prev => new Set([...prev, id]));
  };

  if (visible.length === 0) return null;

  const banner = visible[Math.min(currentIdx, visible.length - 1)];
  if (!banner) return null;

  const isMulti = visible.length > 1;
  const bgColor   = banner.bgColor   || typeDefaults[banner.type]?.bg   || '#7A4F5B';
  const textColor = banner.textColor || typeDefaults[banner.type]?.text || '#ffffff';

  return (
    <div
      className={`hb hb--${animState.replace('-', '_')}`}
      style={{ '--hb-bg': bgColor, '--hb-text': textColor }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Site announcement"
    >
      {/* Progress bar for sliding banners */}
      {banner.displayMode === 'sliding' && !isPaused && (
        <div className="hb__progress">
          <div className="hb__progress-bar" key={`${banner.id}-${currentIdx}`}></div>
        </div>
      )}

      <div className="hb__inner">
        {/* Left: prev arrow */}
        {isMulti && (
          <button className="hb__arrow hb__arrow--prev" onClick={prev} aria-label="Previous">
            ‹
          </button>
        )}

        {/* Content */}
        <div className="hb__content">
          {banner.emoji && <span className="hb__emoji" role="img">{banner.emoji}</span>}
          <div className="hb__text">
            <span className="hb__title">{banner.title}</span>
            {banner.description && (
              <span className="hb__desc">{banner.description}</span>
            )}
          </div>
          {banner.link && banner.linkLabel && (
            <a href={banner.link} className="hb__cta" style={{ color: textColor, borderColor: textColor }}>
              {banner.linkLabel} →
            </a>
          )}
        </div>

        {/* Right: next arrow + dots + close */}
        <div className="hb__controls">
          {isMulti && (
            <button className="hb__arrow hb__arrow--next" onClick={next} aria-label="Next">
              ›
            </button>
          )}
          {isMulti && (
            <div className="hb__dots">
              {visible.map((_, i) => (
                <button
                  key={i}
                  className={`hb__dot ${i === currentIdx ? 'hb__dot--active' : ''}`}
                  onClick={() => goTo(i, i > currentIdx ? 'next' : 'prev')}
                  aria-label={`Banner ${i + 1}`}
                />
              ))}
            </div>
          )}
          <button className="hb__close" onClick={() => dismiss(banner.id)} aria-label="Dismiss">
            ✕
          </button>
        </div>
      </div>

      {/* Type badge */}
      <span className="hb__type-badge">{typeDefaults[banner.type]?.label || 'Notice'}</span>
    </div>
  );
}

const typeDefaults = {
  info:    { bg: '#4A7FB5', text: '#ffffff', label: '📢 Notice'  },
  success: { bg: '#3D7A5A', text: '#ffffff', label: '✅ Update'  },
  warning: { bg: '#C9A96E', text: '#2C1F25', label: '⚠️ Warning' },
  alert:   { bg: '#8B4343', text: '#ffffff', label: '🔔 Alert'   },
  promo:   { bg: '#5C3542', text: '#E2CC9E', label: '🎉 Promo'   },
};
