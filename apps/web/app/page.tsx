'use client';

import { FormEvent, useState } from 'react';
import { createNearxApiClient, type LoginPayload, type NearxApiClient } from '@nearx/api-client';

export default function HomePage() {
  const [baseUrl, setBaseUrl] = useState('https://nearx-backend-r5u3n7ly6-travellershealth7-2672s-projects.vercel.app/api');
  const [email, setEmail] = useState('operator@example.com');
  const [password, setPassword] = useState('nearx123');
  const [status, setStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setToken(null);
    setLoading(true);

    const payload: LoginPayload = {
      email,
      password,
    };

    try {
      const client: NearxApiClient = createNearxApiClient({ baseUrl });
      const response = await client.login(payload);
      setToken(response.token);
      setStatus(`Welcome back, ${response.user.firstName}!`);
    } catch (error: unknown) {
      setStatus(error instanceof Error ? error.message : 'Failed to login. Check backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-8 gap-8'>
      <section className='max-w-xl w-full space-y-4'>
        <h1 className='text-4xl font-bold text-center text-emerald-600'>NEARX Admin</h1>
        <p className='text-center text-slate-600'>
          Authenticate with the identity service to access proximity-first operations tools.
        </p>
      </section>

      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        className='max-w-xl w-full bg-white shadow rounded-xl p-6 space-y-4'
      >
        <div>
          <label className='block text-sm font-medium text-slate-600'>API Base URL</label>
          <input
            value={baseUrl}
            onChange={(event) => setBaseUrl(event.target.value)}
            className='mt-1 w-full rounded border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
            placeholder='http://localhost:3000/api'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-slate-600'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='mt-1 w-full rounded border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
            placeholder='operator@example.com'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-slate-600'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='mt-1 w-full rounded border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400'
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full rounded bg-emerald-500 py-2 font-semibold text-white hover:bg-emerald-600 disabled:opacity-60'
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        {status && (
          <p className='text-sm text-slate-600' data-testid='status-message'>
            {status}
          </p>
        )}

        {token && (
          <div className='rounded border border-emerald-200 bg-emerald-50 p-3 text-sm'>
            <p className='font-medium text-emerald-700'>Session Token</p>
            <code className='break-all text-emerald-600'>{token}</code>
          </div>
        )}
      </form>
    </main>
  );
}
