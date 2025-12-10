'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ConfettiBackground from '@/components/ConfettiBackground';
import VoeuxForm from '@/components/VoeuxForm';

function VoeuxContent() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get('name') || '';

  const displayName = useMemo(() => {
    if (!nameParam) return '';
    const trimmed = nameParam.trim();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }, [nameParam]);

  const greetingTitle = displayName ? `Bonne année ${displayName} 🎉 !` : 'Bonne année 2026 !';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const shareUrl = useMemo(() => {
    try {
      const url = new URL('/voeux', baseUrl);
      if (displayName) {
        url.searchParams.set('name', displayName);
      }
      return url.toString();
    } catch {
      return `${baseUrl}/voeux`;
    }
  }, [baseUrl, displayName]);

  const whatsAppText = encodeURIComponent(
    `Je te souhaite une merveilleuse année 2026 ✨ Découvre ta carte de vœux personnalisée : ${shareUrl}`
  );

  const whatsAppLink = `https://wa.me/?text=${whatsAppText}`;

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 text-white md:px-8">
      <ConfettiBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/70" />

      <section className="relative z-10 w-full max-w-4xl">
        <div className="lux-card px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            {/* Colonne gauche : message principal */}
            <div className="flex-1 space-y-6 md:space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-gold to-gold-soft" />
                Vœux de fin d’année 2025 → 2026
              </span>

              <div className="space-y-4">
                <h1 className="font-display text-3xl leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-gold-soft via-white to-gold bg-clip-text text-transparent animate-glow-pulse">
                    {greetingTitle}
                  </span>
                </h1>

                {!displayName && (
                  <p className="max-w-xl text-sm text-white/60 sm:text-base">
                    Que cette nouvelle année t’apporte plus que ce que tu oses imaginer. Personnalise
                    cette page en ajoutant ton prénom dans l’URL ou via le formulaire ci-dessous.
                  </p>
                )}
              </div>

              <div className="space-y-3 animate-fade-in-up-delayed">
                <div className="h-px w-24 bg-gradient-to-r from-gold-soft via-gold to-transparent" />
                <p className="max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                  Santé, paix, amour, réussite et prospérité pour cette nouvelle année.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs sm:text-sm"
                >
                  Partager cette page sur WhatsApp
                </a>

                <button
                  type="button"
                  className="btn-outline-light text-[11px] sm:text-xs"
                  onClick={() => {
                    if (navigator?.share) {
                      navigator
                        .share({
                          title: 'Vœux de fin d’année 2026',
                          text: 'Une carte de vœux élégante et personnalisée pour la nouvelle année.',
                          url: shareUrl
                        })
                        .catch(() => {});
                    } else {
                      navigator.clipboard
                        .writeText(shareUrl)
                        .catch(() => {});
                    }
                  }}
                >
                  Copier le lien de la page
                </button>
              </div>
            </div>

            {/* Colonne droite : formulaire */}
            <div className="mt-6 w-full max-w-md md:mt-0 md:w-80">
              <div className="mb-4 h-1 w-20 rounded-full lux-border-gradient" />
              <h2 className="font-display text-lg text-gold-soft">
                Recevoir vos vœux personnalisés
              </h2>
              <p className="mt-1 text-xs text-white/60">
                Laissez votre prénom et votre email pour recevoir une version personnalisée de ces
                vœux.
              </p>

              <VoeuxForm initialName={displayName || ''} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function VoeuxPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-night" />}>
      <VoeuxContent />
    </Suspense>
  );
}
