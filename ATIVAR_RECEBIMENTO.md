# Recebimento da carreta e etiquetas

1. No GitHub, envie todos os arquivos do site deste pacote: index.html, app.js, style.css, config.js, google.js, recebimento.js e produtos.js. Mantenha a planilha base.
2. No projeto Apps Script existente, substitua Codigo.gs pelo arquivo novo completo.
3. Salve e execute prepararRecebimentos. Autorize se solicitado. Será criada a aba RECEBIMENTOS na mesma planilha, sem apagar CONTAGENS nem FAROL.
4. Use Implantar → Gerenciar implantações → Editar → Nova versão → Implantar, mantendo o mesmo /exec.
5. Aguarde o GitHub publicar e abra o site com Ctrl + Shift + R.

## Fluxo
Conferência → Recebimento da carreta → adicionar código, paletes/lastros/caixas, validade e quantidade de paletes físicos (inclusive incompletos). Uma validade diferente exige outro lançamento. Chapatex e paletes de madeira são totais da descarga. Finalizar coleta abre os dados da NF, origem, placas, data, hora, turno, conferente e motorista. Salvar recebimento envia os registros e só libera etiquetas após a confirmação do Google.

Cada linha em RECEBIMENTOS repete os dados gerais antes dos dados do produto e da validade. Chapatex e madeira se repetem para consulta: não some essas colunas por produto, pois são totais da descarga. Os recebimentos não são adicionados ao FAROL de contagem física.

## Impressão
Escolha de 1 a 3 etiquetas por palete físico, com 3 etiquetas por folha A4. Configure papel A4, escala 100%, gráficos de fundo e desative cabeçalhos/rodapés na janela de impressão. Não há campo Carregar até. O mesmo número do palete aparece nas cópias para seus lados. A numeração reinicia em cada recebimento. A quantidade da etiqueta é o total recebido daquele produto e validade, não uma distribuição individual de caixas por palete.

O rascunho e a última coleta salva ficam no aparelho. É possível reimprimir ali até iniciar Novo recebimento; todo histórico fica na planilha. Consulta e reimpressão de recebimentos antigos por outro aparelho ainda não foram adicionadas. Reenviar o mesmo registro não duplica linhas. Registros já enviados ficam bloqueados; correções posteriores são feitas na planilha. A impressão será solicitada ao navegador, sem confirmação de impressão física pelo sistema.
