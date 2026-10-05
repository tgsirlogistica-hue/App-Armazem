# Contagem de estoque TGR

## Publicar no GitHub Pages
1. Crie um repositório chamado `contagem-estoque` na sua conta.
2. Extraia este ZIP e envie os arquivos diretamente para a raiz do repositório.
3. Em Settings → Pages, selecione Deploy from a branch, branch `main`, pasta `/ (root)` e Save.
4. O GitHub mostrará o endereço publicado quando a implantação terminar.

## Uso
Abra Contagem de estoque ou Contagem de avarias. Pesquise o código, informe paletes completos, lastros adicionais e caixas soltas, e salve cada produto. O total é paletes × caixas por palete + lastros × caixas por lastro + caixas soltas. Registros repetidos são lançamentos adicionais e entram na soma. Zero é aceito para documentar produto sem estoque.

Salvar contagem abre a revisão e baixa um CSV compatível com Excel. O rascunho usa o navegador do aparelho; não há sincronização entre usuários nem gravação de contagens no GitHub. Exporte antes de limpar os dados do navegador. Excluir um registro ou iniciar nova contagem pede confirmação.

## Base
`BASE DE CONTAGEM.xlsx` é a planilha original. `produtos.js` contém os dados extraídos dela para a pesquisa funcionar sem bibliotecas externas, inclusive abrindo `index.html` diretamente. A aba base contém 212 linhas de produtos. Os códigos da aba cod prod também são pesquisáveis. Códigos adicionais recebem conversões apenas quando o nome coincide exatamente com o nome da base. Conversões ausentes nunca são presumidas: os respectivos campos são bloqueados.

Alterar apenas a planilha não atualiza produtos.js automaticamente. Solicite uma nova conversão da base ao atualizar produtos. GitHub Pages com acesso público permite que visitantes consultem a base publicada. Não envie senhas ou tokens ao repositório.
