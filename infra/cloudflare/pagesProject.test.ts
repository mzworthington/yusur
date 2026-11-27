import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('adopts the Pages project Wrangler already created and schedules Observatory after its DNS record', () => {
  const source = readFileSync(new URL('./index.ts', import.meta.url), 'utf8');

  assert.match(source, /import: `\$\{accountId\}\/\$\{pagesProjectName\}`/);
  assert.match(source, /ignoreChanges: \['buildConfig', 'deploymentConfigs', 'source'\]/);
  assert.match(
    source,
    /new cloudflare\.PagesDomain\([\s\S]*?import: `\$\{accountId\}\/\$\{pagesProjectName\}\/\$\{hostname\}`/,
  );
  assert.match(
    source,
    /new cloudflare\.ObservatoryScheduledTest\([\s\S]*?\{\s*dependsOn: \[dns\]\s*\}/,
  );
});
