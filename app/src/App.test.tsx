import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from './App';

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
});

describe('App splash', () => {
  it('shows a Happy Birth Yusur splash and hides the site chrome', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Happy Birth Yusur' })).toBeTruthy();
    expect(screen.queryByRole('navigation', { name: 'Primary' })).toBeNull();
    expect(screen.queryByRole('contentinfo')).toBeNull();
  });

  it('keeps the splash on /privacy', () => {
    window.history.replaceState({}, '', '/privacy');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Happy Birth Yusur' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Privacy policy' })).toBeNull();
  });

  it('keeps the splash on nested docs paths', () => {
    window.history.replaceState({}, '', '/docs/adrs/0001-cloudflare-pages-pulumi-wrangler');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Happy Birth Yusur' })).toBeTruthy();
    expect(screen.queryByText(/not found/i)).toBeNull();
  });

  it('keeps the splash on the ADR index', () => {
    window.history.replaceState({}, '', '/docs/adrs');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Happy Birth Yusur' })).toBeTruthy();
  });
});
