import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { readFileSync } from 'node:fs';

import { assertSiteZone, loadHostingConfig } from './hostingConfig.ts';

describe('hosting config', () => {
  it('reads the Pages project, account, and zone from committed yaml', () => {
    const hosting = loadHostingConfig(`pagesProjectName: yusur
pagesHostnames:
  - www.yusur.co.uk
  - yusur.co.uk
enableWebAnalytics: false
accountId: fe0bb0a89551958509fe4d65883026cc
zoneId: 8fa428280586fdd39a02330d36ae0727
zoneName: yusur.co.uk
`);

    assert.deepEqual(hosting, {
      pagesProjectName: 'yusur',
      pagesHostnames: ['www.yusur.co.uk', 'yusur.co.uk'],
      enableWebAnalytics: false,
      accountId: 'fe0bb0a89551958509fe4d65883026cc',
      zoneId: '8fa428280586fdd39a02330d36ae0727',
      zoneName: 'yusur.co.uk',
    });
  });

  it('commits the yusur zone and rejects another zone name', () => {
    const hosting = loadHostingConfig(
      readFileSync(new URL('./hosting.yaml', import.meta.url), 'utf8'),
    );
    assert.equal(hosting.accountId, 'fe0bb0a89551958509fe4d65883026cc');
    assert.equal(hosting.zoneId, '8fa428280586fdd39a02330d36ae0727');
    assert.equal(hosting.zoneName, 'yusur.co.uk');
    assertSiteZone(hosting.zoneName, hosting.zoneName, hosting.pagesHostnames);
    assert.throws(
      () => assertSiteZone('archlens.dev', hosting.zoneName, hosting.pagesHostnames),
      /this site's zone is yusur\.co\.uk/,
    );
  });
});
