"""Read-only SHA-256 and ZIP CRC verification; Python standard library only."""
from pathlib import Path
import argparse, hashlib, json, zipfile

def verify(root, manifest):
    root=Path(root).resolve();manifest=Path(manifest).resolve()
    errors=[];checked=0;archives=0
    data=json.loads(manifest.read_text(encoding='utf-8-sig'))
    for item in data['files']:
        path=root/item['path']
        if not path.resolve().is_relative_to(root):
            errors.append(item['path']+': outside archive root');continue
        if not path.is_file():
            errors.append(item['path']+': missing');continue
        checked+=1
        with path.open('rb') as stream:
            digest=hashlib.file_digest(stream,'sha256').hexdigest()
        if digest.lower()!=item['sha256'].lower():errors.append(item['path']+': SHA-256 mismatch')
        if 'bytes' in item and path.stat().st_size!=item['bytes']:errors.append(item['path']+': size mismatch')
        if path.suffix.lower()=='.zip':
            archives+=1
            try:
                with zipfile.ZipFile(path) as archive:
                    bad=archive.testzip()
                    if bad:errors.append(item['path']+': ZIP CRC failure '+bad)
            except (OSError,zipfile.BadZipFile,RuntimeError) as exc:errors.append(item['path']+': invalid ZIP '+str(exc))
    return {'passed':not errors,'filesChecked':checked,'zipArchivesChecked':archives,'errors':errors}

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('root',type=Path);parser.add_argument('manifest',type=Path)
    args=parser.parse_args();result=verify(args.root,args.manifest)
    print(json.dumps(result,ensure_ascii=False,indent=2))
    raise SystemExit(0 if result['passed'] else 1)
