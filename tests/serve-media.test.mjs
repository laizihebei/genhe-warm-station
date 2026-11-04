import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createPreviewServer} from '../serve.mjs';

test('local course video and Chinese captions have browser-readable MIME types',async t=>{
 const root=await mkdtemp(join(tmpdir(),'genhe-course-media-'));
 await writeFile(join(root,'presentation.mp4'),Buffer.from([0,0,0,20,102,116,121,112]));
 await writeFile(join(root,'captions.srt'),'1\n00:00:00,000 --> 00:00:01,000\n入口缓冲\n');
 const server=createPreviewServer({root});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 t.after(async()=>{await new Promise(r=>server.close(r));await rm(root,{recursive:true,force:true});});
 const base=`http://127.0.0.1:${server.address().port}`;
 const video=await fetch(base+'/presentation.mp4');assert.equal(video.status,200);assert.equal(video.headers.get('content-type'),'video/mp4');assert.equal((await video.arrayBuffer()).byteLength,8);
 const captions=await fetch(base+'/captions.srt');assert.match(captions.headers.get('content-type'),/charset=utf-8/);assert.match(await captions.text(),/入口缓冲/);
 const range=await fetch(base+'/presentation.mp4',{headers:{Range:'bytes=0-3'}});const body=await range.arrayBuffer();assert.equal(range.status,206);assert.equal(range.headers.get('content-range'),'bytes 0-3/8');assert.equal(range.headers.get('accept-ranges'),'bytes');assert.equal(body.byteLength,4);
 const suffix=await fetch(base+'/presentation.mp4',{headers:{Range:'bytes=-2'}});assert.deepEqual([...new Uint8Array(await suffix.arrayBuffer())],[121,112]);assert.equal(suffix.status,206);
 const invalid=await fetch(base+'/presentation.mp4',{headers:{Range:'bytes=999-'}});await invalid.arrayBuffer();assert.equal(invalid.status,416);assert.equal(invalid.headers.get('content-range'),'bytes */8');
});
