export interface HostingConfig {
  pagesProjectName: string;
  pagesHostnames: string[];
  enableWebAnalytics: boolean;
  accountId: string;
  zoneId: string;
  zoneName: string;
}

const HEX_ID = /^[a-f0-9]{32}$/;

/** Fail the stack when the live zone is not this site's zone. */
export function assertSiteZone(
  zoneName: string,
  expectedZoneName: string,
  hostnames: string[],
): void {
  if (zoneName !== expectedZoneName) {
    throw new Error(`Cloudflare zone name is ${zoneName}; this site's zone is ${expectedZoneName}`);
  }
  for (const host of hostnames) {
    if (host !== zoneName && !host.endsWith(`.${zoneName}`)) {
      throw new Error(`Hostname ${host} is not in zone ${zoneName}`);
    }
  }
}

/** Pages identity plus the Cloudflare account and zone. Tokens stay in the secret store. */
export function loadHostingConfig(source: string): HostingConfig {
  let pagesProjectName = '';
  const pagesHostnames: string[] = [];
  let enableWebAnalytics: boolean | undefined;
  let accountId = '';
  let zoneId = '';
  let zoneName = '';
  let inHostnames = false;

  for (const raw of source.split(/\r?\n/)) {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) continue;

    if (line.startsWith('pagesHostnames:')) {
      inHostnames = true;
      continue;
    }
    if (inHostnames && line.startsWith('- ')) {
      pagesHostnames.push(unquote(line.slice(2).trim()));
      continue;
    }
    inHostnames = false;

    const sep = line.indexOf(':');
    if (sep === -1) throw new Error(`Invalid hosting.yaml line: ${line}`);
    const key = line.slice(0, sep).trim();
    const value = unquote(line.slice(sep + 1).trim());
    if (key === 'pagesProjectName') {
      pagesProjectName = value;
    } else if (key === 'accountId') {
      accountId = value;
    } else if (key === 'zoneId') {
      zoneId = value;
    } else if (key === 'zoneName') {
      zoneName = value;
    } else if (key === 'enableWebAnalytics') {
      if (value !== 'true' && value !== 'false') {
        throw new Error('enableWebAnalytics must be true or false');
      }
      enableWebAnalytics = value === 'true';
    } else {
      throw new Error(`Unknown hosting.yaml key: ${key}`);
    }
  }

  if (pagesProjectName === '') throw new Error('hosting.yaml pagesProjectName is required');
  if (pagesHostnames.length === 0) throw new Error('hosting.yaml pagesHostnames is required');
  if (enableWebAnalytics === undefined) {
    throw new Error('hosting.yaml enableWebAnalytics is required');
  }
  if (!HEX_ID.test(accountId)) {
    throw new Error('hosting.yaml accountId must be a 32-character hex id');
  }
  if (!HEX_ID.test(zoneId)) {
    throw new Error('hosting.yaml zoneId must be a 32-character hex id');
  }
  if (zoneName === '') throw new Error('hosting.yaml zoneName is required');

  return { pagesProjectName, pagesHostnames, enableWebAnalytics, accountId, zoneId, zoneName };
}

function unquote(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}
