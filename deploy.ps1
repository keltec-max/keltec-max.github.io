$gh = "C:\Program Files\GitHub CLI\gh.exe"
$repoName = "keltec-max.github.io"
$sitePath = "C:\Users\kelvi\OneDrive\Documentos\Site"

cd $sitePath

git init
git add .
git commit -m "Deploy automático"
git branch -M main

# Login no GitHub (abre navegador)
& $gh auth login

# Criar repo + enviar arquivos
& $gh repo create $repoName --public --source=. --remote=origin --push

# Ativar GitHub Pages
& $gh api -X POST repos/keltec-max/$repoName/pages -f source[branch]=main -f source[path]=/

Write-Host ""
Write-Host "🚀 Site publicado:"
Write-Host "https://keltec-max.github.io/"