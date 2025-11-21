#!/bin/bash

# Script para corrigir erros de hydration causados por toLocaleString()
# Adiciona suppressHydrationWarning em divs que usam toLocaleString()

echo "Corrigindo erros de hydration em páginas admin e provider..."

# Encontrar todos os arquivos que usam toLocaleString
files=$(grep -rl "toLocaleString" src/app/\(admin\)/ src/app/\(provider\)/ 2>/dev/null)

for file in $files; do
  echo "Processando: $file"

  # Substituir <div className="text-2xl font-bold"> por <div className="text-2xl font-bold" suppressHydrationWarning>
  # quando seguido por toLocaleString()
  sed -i 's/<div className="\([^"]*\)">\s*{\([^}]*\)\.toLocaleString/<div className="\1" suppressHydrationWarning>{\2.toLocaleString/g' "$file"

  # Substituir spans também
  sed -i 's/<span className="\([^"]*\)">\s*{\([^}]*\)\.toLocaleString/<span className="\1" suppressHydrationWarning>{\2.toLocaleString/g' "$file"
done

echo "✅ Correção concluída!"
echo "Arquivos processados: $(echo "$files" | wc -l)"
