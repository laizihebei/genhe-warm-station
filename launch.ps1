param([switch]$NoBrowser)
$ErrorActionPreference='Stop'
$siteRoot=$PSScriptRoot
$nodePath=Join-Path $siteRoot 'runtime\node.exe'
if(-not (Test-Path -LiteralPath $nodePath)){$nodePath=(Get-Command node -ErrorAction SilentlyContinue).Source}
if(-not $nodePath){throw '未找到本地运行环境。请使用完整课程交付文件夹，或安装 Node.js 后运行源码包。'}
$expected=(Get-Content -LiteralPath (Join-Path $siteRoot 'assets\release.json') -Raw -Encoding UTF8 | ConvertFrom-Json).id
for($previewPort=4179;$previewPort -le 4199;$previewPort++){
 $baseUrl="http://127.0.0.1:$previewPort"
 try{$r=Invoke-RestMethod ($baseUrl+'/assets/release.json') -TimeoutSec 1;if($r.id -eq $expected){if(-not $NoBrowser){Start-Process ($baseUrl+'/index.html')};Write-Output ($baseUrl+'/index.html');exit 0}}catch{}
 $busy=Get-NetTCPConnection -LocalPort $previewPort -State Listen -ErrorAction SilentlyContinue
 if($busy){continue}
 $servePath='"'+(Join-Path $siteRoot 'serve.mjs')+'"'
 Start-Process -FilePath $nodePath -ArgumentList @($servePath,"$previewPort") -WorkingDirectory $siteRoot -WindowStyle Hidden
 for($attempt=0;$attempt -lt 20;$attempt++){
  Start-Sleep -Milliseconds 200
  try{$r=Invoke-RestMethod ($baseUrl+'/assets/release.json') -TimeoutSec 1;if($r.id -eq $expected){if(-not $NoBrowser){Start-Process ($baseUrl+'/index.html')};Write-Output ($baseUrl+'/index.html');exit 0}}catch{}
 }
}
throw '未能启动本地网站，请关闭旧的本地预览服务后重试。'
