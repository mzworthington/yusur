import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

describe('birthday share card', () => {
  it('points crawlers at a party favicon and a Happy Birth Yusur image', () => {
    const html = readFileSync(path.join(appRoot, 'index.html'), 'utf8');
    const favicon = readFileSync(path.join(appRoot, 'public/favicon.svg'), 'utf8');

    expect(html).toContain('content="Happy Birth Yusur"');
    expect(html).toContain('og:image" content="https://yusur.co.uk/assets/social-share.png"');
    expect(html).not.toContain('product work, not plumbing');
    expect(favicon).toContain('#ff2d95');
  });
});
