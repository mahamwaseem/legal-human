import React, { useState } from 'react';
import { useBanners } from '../context/BannerContext';
import './HomeBanner.css';

const typeDefaults = {
  info:    { bg: '#4A7FB5', text: '#ffffff' },
  success: { bg: '#3D7A5A', text: '#ffffff' },
  warning: { bg: '#C9A96E', text: '#2C1F25' },
  alert:   { bg: '#8B4343', text: '#ffffff' },
  promo:   { bg: '#5C3542', text: '#E2CC9E' },
};

export default function HomeBanner() {
  const { activeBanners } = useBanners();
  const [dismissed, setDismissed] = useState(new Set());

  const visible = (activeBanners || []).filter(function(b) {
    return !dismissed.has(b.id);
  });

  function dismiss(id) {
    setDismissed(function(prev) {
      return new Set([...prev, id]);
    });
  }

  if (visible.length === 0) return null;

  function renderItems(isDuplicate) {
    return visible.map(function(banner) {
      var bgColor = banner.bgColor || (typeDefaults[banner.type] && typeDefaults[banner.type].bg) || '#7A4F5B';
      var textColor = banner.textColor || (typeDefaults[banner.type] && typeDefaults[banner.type].text) || '#ffffff';

      return (
        <div
          key={isDuplicate ? 'dup-' + banner.id : banner.id}
          className="hb__item"
          style={{ background: bgColor, color: textColor }}
        >
          {banner.emoji && (
            <span className="hb__emoji">{banner.emoji}</span>
          )}

          <span className="hb__title">{banner.title}</span>

          {banner.description && (
            <span className="hb__desc">{banner.description}</span>
          )}

          {banner.link && banner.linkLabel && (
            
              <a href={banner.link}
              className="hb__cta"
              style={{ color: textColor, borderColor: textColor }}
            >
              {banner.linkLabel} →
            </a>
          )}

          {!isDuplicate && (
            <button
              className="hb__close"
              style={{ color: textColor }}
              onClick={function() { dismiss(banner.id); }}
            >
              ✕
            </button>
          )}
        </div>
      );
    });
  }

  return (
    <div className="hb">
      <div className="hb__inner">
        <div className="hb__scroll">
          {renderItems(false)}
          {renderItems(true)}
        </div>
      </div>
    </div>
  );
}