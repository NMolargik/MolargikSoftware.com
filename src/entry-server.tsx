import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';

/**
 * Build-time render of one route to an HTML string, used by
 * scripts/postbuild-seo.mjs (built by `vite build --ssr`, see package.json).
 * `prerenderToNodeStream` waits for the lazy page chunks, so the real page content is
 * in the output rather than the Suspense spinner.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
    {
      onError(error) {
        throw error;
      },
    },
  );
  // Node's build of react-dom/static hands back a Node Readable (async iterable of chunks).
  const decoder = new TextDecoder();
  let html = '';
  for await (const chunk of prelude as unknown as AsyncIterable<Uint8Array>) {
    html += decoder.decode(chunk, { stream: true });
  }
  return html + decoder.decode();
}
