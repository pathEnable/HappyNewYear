'use client';

import { useState } from 'react';

export default function VoeuxForm({ initialName = '' }) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('idle');

    if (!name.trim()) {
      setError('Merci d’indiquer votre prénom.');
      return;
    }
    if (!email.trim()) {
      setError('Merci d’indiquer votre adresse email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Merci de saisir un email valide.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim()
        })
      });

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('error');
      setError("Une erreur s’est produite. Merci de réessayer dans un instant.");
    }
  };

  const disabled = status === 'loading' || status === 'success';

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-inner shadow-black/60 backdrop-blur-md"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            Nom
          </label>
          <input
            type="text"
            className="input-lux"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre prénom"
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            Email
          </label>
          <input
            type="email"
            className="input-lux"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@example.com"
            disabled={disabled}
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-300">{error}</p>}

      {status === 'success' && (
        <p className="text-xs text-emerald-300">
          Merci&nbsp;! Vos vœux personnalisés vous parviendront très bientôt.
        </p>
      )}

      <button type="submit" className="btn-gold w-full md:w-auto" disabled={disabled}>
        {status === 'loading' && 'Envoi en cours...'}
        {status === 'success' && 'Vœux envoyés'}
        {status === 'idle' && 'Recevoir mes vœux personnalisés'}
      </button>
    </form>
  );
}
