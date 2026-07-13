'use client';

import React, { useActionState } from 'react';
import { loginAction } from './actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[var(--surface-base)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[var(--accent-primary)] blur-[150px] opacity-10 transform scale-150 -translate-y-1/2"></div>
      
      <div className="glass-panel relative z-10 p-10 md:p-14 w-full max-w-md border-[var(--border-subtle)] rounded-3xl shadow-2xl flex flex-col items-center">
        
        <div className="w-16 h-16 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center mb-8">
          <div className="w-6 h-6 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-3xl font-light tracking-widest uppercase text-[var(--text-primary)] mb-2 text-center">
          Infinity Solution
        </h1>
        <p className="text-[var(--text-secondary)] text-sm tracking-widest uppercase mb-10 text-center">
          Secure Access Portal
        </p>

        <form action={formAction} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-secondary)] pl-1">
              Admin ID
            </label>
            <input 
              type="text" 
              name="username"
              required
              className="bg-black/20 border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors w-full"
              placeholder="Enter ID"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-secondary)] pl-1">
              Password
            </label>
            <input 
              type="password" 
              name="password"
              required
              className="bg-black/20 border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors w-full"
              placeholder="Enter Password"
            />
          </div>

          {state?.error && (
            <div className="text-red-400 text-sm text-center font-medium bg-red-950/30 py-3 rounded-lg border border-red-900/50">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="mt-4 w-full bg-[var(--accent-primary)] text-white text-sm font-bold tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Authenticating...' : 'Enter System'}
          </button>
        </form>
        
      </div>
    </div>
  );
}
