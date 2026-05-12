$repoUrl = "https://github.com/keltec-max/keltec-max.github.io.git"
$token = Read-Host "Cole seu token do GitHub" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
)

$sitePath = "C:\Users\kelvi\OneDrive\Documentos\Site"

cd $sitePath

git add .
git commit -m "update automático"

# monta URL com token
$authUrl = $repoUrl -replace "https://", "https://$tokenPlain@"

git push $authUrl main

Write-Host "🚀 Site atualizado!"