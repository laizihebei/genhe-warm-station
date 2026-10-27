$ErrorActionPreference='Stop'
$siteRoot=$PSScriptRoot
$nodePath=(Get-Command node -ErrorAction SilentlyContinue).Source
if(-not $nodePath){Write-Host '请先安装 Node.js，再打开本地网站。';Read-Host;exit 1}
$expected=(Get-Content -LiteralPath (Join-Path $siteRoot 'assets\release.json') -Raw | ConvertFrom-Json).id
for($previewPort=4179;$previewPort -le 4189;$previewPort++){
 $baseUrl="http://127.0.0.1:$previewPort"
 try{$r=Invoke-RestMethod ($baseUrl+'/assets/release.json') -TimeoutSec 1;if($r.id -eq $expected){Start-Process ($baseUrl+'/index.html');exit 0}}catch{}
 $busy=Get-NetTCPConnection -LocalPort $previewPort -State Listen -ErrorAction SilentlyContinue
 if($busy){continue}
 Start-Process -FilePath $nodePath -ArgumentList @('serve.mjs',"$previewPort") -WorkingDirectory $siteRoot -WindowStyle Hidden
 for($attempt=0;$attempt -lt 20;$attempt++){
  Start-Sleep -Milliseconds 200
  try{$r=Invoke-RestMethod ($baseUrl+'/assets/release.json') -TimeoutSec 1;if($r.id -eq $expected){Start-Process ($baseUrl+'/index.html');exit 0}}catch{}
 }
}
Write-Host '无法启动本地预览，请查看网站 README。'
Read-Host
