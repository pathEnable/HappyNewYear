'use client';

const PIECES = 40;

/**
 * Contexte décoratif de confettis dorés animés.
 * Aucun clic bloqué car pointer-events: none.
 */
export default function ConfettiBackground() {
  return (
    <div className="confetti-layer">
      {Array.from({ length: PIECES }).map((_, i) => {
        const left = (i * 97) % 100; // répartition horizontale
        const duration = 9 + (i % 6); // 9–14s
        const delay = (i % 10) * 0.6; // décalage
        const opacity = 0.4 + ((i % 5) * 0.12); // variations légères

        return (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity
            }}
          />
        );
      })}
    </div>
  );
}
