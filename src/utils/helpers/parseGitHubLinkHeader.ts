export function parseGitHubLinkHeader(header: string): null | Record<string, URL> {
  const linkExtractor = /<(.+)>.+rel="(\w+)"/;
  const links = header.split(',');
  const entries = links.map((el) => {
    const match = el.match(linkExtractor);

    return match !== null ? ([match[2], new URL(match[1])] as const) : [];
  });
  return Object.fromEntries(entries);
}
