import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createPreviewServer } from '../serve.mjs';

test('preview server serves site files and blocks traversal outside its root', async t => {
  const folder = await mkdtemp(join(tmpdir(), 'genhe-preview-'));
  const root = join(folder, 'site');
  await mkdir(root);
  await writeFile(join(root, 'index.html'), '<h1>Genhe</h1>');
  await writeFile(join(folder, 'secret.txt'), 'not for the site');
  const server = createPreviewServer({ root });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await rm(folder, { recursive: true, force: true });
  });

  const base = `http://127.0.0.1:${server.address().port}`;
  const page = await fetch(`${base}/`);
  assert.equal(page.status, 200);
  assert.match(page.headers.get('content-type'), /text\/html/);
  assert.equal(await page.text(), '<h1>Genhe</h1>');

  const escaped = await fetch(`${base}/%2e%2e%2fsecret.txt`);
  assert.equal(escaped.status, 404);
});
