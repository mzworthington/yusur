import { useEffect } from 'react';
import './splash.css';

const BALLOONS = [
  { left: '6%', delay: '0s', color: '#ff2d95', size: '5.4rem', duration: '7.5s' },
  { left: '16%', delay: '1.2s', color: '#ffe56a', size: '3.6rem', duration: '9s' },
  { left: '78%', delay: '0.4s', color: '#67e8f9', size: '4.8rem', duration: '8s' },
  { left: '88%', delay: '1.8s', color: '#c4b5fd', size: '3.2rem', duration: '6.8s' },
  { left: '70%', delay: '0.8s', color: '#fb7185', size: '2.6rem', duration: '10s' },
] as const;

const CONFETTI = [
  { left: '8%', delay: '0s', duration: '6.2s', color: '#ff4d8d', rotate: '-22deg', kind: 'rect' },
  { left: '14%', delay: '1.1s', duration: '7.4s', color: '#ffe56a', rotate: '18deg', kind: 'dot' },
  { left: '21%', delay: '0.4s', duration: '5.6s', color: '#67e8f9', rotate: '40deg', kind: 'rect' },
  { left: '28%', delay: '2.2s', duration: '8.1s', color: '#fff', rotate: '-8deg', kind: 'slash' },
  { left: '35%', delay: '0.8s', duration: '6.8s', color: '#c4b5fd', rotate: '12deg', kind: 'dot' },
  {
    left: '42%',
    delay: '1.6s',
    duration: '7.9s',
    color: '#fb7185',
    rotate: '-30deg',
    kind: 'rect',
  },
  {
    left: '49%',
    delay: '0.2s',
    duration: '5.9s',
    color: '#ffe56a',
    rotate: '26deg',
    kind: 'slash',
  },
  { left: '56%', delay: '2.6s', duration: '8.4s', color: '#22d3ee', rotate: '-14deg', kind: 'dot' },
  { left: '63%', delay: '1.3s', duration: '6.5s', color: '#ff2d95', rotate: '8deg', kind: 'rect' },
  {
    left: '71%',
    delay: '0.6s',
    duration: '7.2s',
    color: '#fff7c2',
    rotate: '-36deg',
    kind: 'slash',
  },
  { left: '78%', delay: '1.9s', duration: '5.4s', color: '#a78bfa', rotate: '20deg', kind: 'dot' },
  { left: '86%', delay: '0.9s', duration: '8.8s', color: '#f97316', rotate: '-6deg', kind: 'rect' },
  {
    left: '93%',
    delay: '2.1s',
    duration: '6.1s',
    color: '#ffe56a',
    rotate: '32deg',
    kind: 'slash',
  },
  { left: '4%', delay: '3s', duration: '7.7s', color: '#67e8f9', rotate: '14deg', kind: 'dot' },
  {
    left: '18%',
    delay: '3.4s',
    duration: '6.4s',
    color: '#ff4d8d',
    rotate: '-28deg',
    kind: 'rect',
  },
  { left: '46%', delay: '2.8s', duration: '9s', color: '#fff', rotate: '6deg', kind: 'slash' },
  { left: '67%', delay: '3.2s', duration: '5.8s', color: '#fb7185', rotate: '-16deg', kind: 'dot' },
  { left: '82%', delay: '2.4s', duration: '7.6s', color: '#c4b5fd', rotate: '24deg', kind: 'rect' },
] as const;

const RIBBON = 'Happy Birth Yusur ✦ Happy Birth Yusur ✦ Happy Birth Yusur ✦ Happy Birth Yusur ✦ ';

export function SplashPage() {
  useEffect(() => {
    document.title = 'Happy Birth Yusur';
  }, []);

  return (
    <main className="splash">
      <div className="splash-sky" aria-hidden="true">
        <div className="splash-burst" />
        <div className="splash-glow splash-glow-left" />
        <div className="splash-glow splash-glow-right" />
        {BALLOONS.map((balloon) => (
          <span
            key={balloon.left}
            className="splash-balloon"
            style={{
              left: balloon.left,
              animationDelay: balloon.delay,
              animationDuration: balloon.duration,
              background: balloon.color,
              width: balloon.size,
              height: `calc(${balloon.size} * 1.18)`,
            }}
          />
        ))}
        {CONFETTI.map((piece) => (
          <span
            key={`${piece.left}-${piece.delay}`}
            className={`splash-confetti splash-confetti-${piece.kind}`}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              background: piece.color,
              color: piece.color,
              transform: `rotate(${piece.rotate})`,
            }}
          />
        ))}
      </div>

      <p className="splash-ribbon splash-ribbon-top" aria-hidden="true">
        <span>{RIBBON}</span>
        <span>{RIBBON}</span>
      </p>

      <h1 className="splash-title">
        <span className="splash-happy">Happy</span> <span className="splash-birth">Birth</span>{' '}
        <span className="splash-yusur">Yusur</span>
      </h1>

      <p className="splash-ribbon splash-ribbon-bottom" aria-hidden="true">
        <span>{RIBBON}</span>
        <span>{RIBBON}</span>
      </p>
    </main>
  );
}
