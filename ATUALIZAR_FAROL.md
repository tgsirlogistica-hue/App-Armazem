# Ativar a primeira aba FAROL

1. Abra o projeto Apps Script já usado para salvar as contagens.
2. Substitua o código pelo conteúdo completo do novo Codigo.gs. Não altere config.js: o endereço do site continua igual.
3. Salve, selecione atualizarFarol e clique em Executar. Autorize, caso o Google solicite.
4. O script cria FAROL e move essa aba para a primeira posição. Os dados existentes em CONTAGENS são preservados.
5. Vá a Implantar → Gerenciar implantações → Editar (lápis) → Nova versão → Implantar. Assim, o mesmo endereço /exec passa a usar o código novo.
6. Envie uma contagem pelo site e confira a coluna da data na aba FAROL.

Cada linha mostra um produto da base, e cada coluna de data mostra a soma das caixas registradas naquele dia, no horário da Bahia. Produtos sem lançamento naquele dia exibem 0. A última linha mostra TOTAL DE CAIXAS para cada data. Sem nenhum registro, a aba mostra apenas o cadastro e o total; a primeira coluna de data aparece quando há contagem. Códigos curtos conhecidos são agrupados no código principal do produto. Produtos contados que não constam na base principal entram em linhas adicionais.

O botão Salvar na planilha Google atualiza o farol automaticamente. Cada novo lançamento do produto é uma parcela adicional da contagem e entra na soma diária, inclusive de aparelhos diferentes. Reenviar o mesmo registro não duplica sua quantidade. Para corrigir um erro, edite ou exclua a linha em CONTAGENS e atualize o farol; não registre a quantidade corrigida como uma nova parcela. Avarias não entram no estoque; ficam detalhadas em CONTAGENS. Dias em que houve apenas avarias aparecem com estoque 0.

FAROL é uma visão gerada: não preencha suas células manualmente. O histórico é reconstruído de CONTAGENS, que deve ser preservada. Para corrigir ou excluir uma contagem já enviada, ajuste a linha em CONTAGENS e execute atualizarFarol, ou reabra a planilha e use Contagem TGR → Atualizar farol. Uma alteração manual não atualiza o farol sozinha. Zero significa ausência de caixas registradas, e pode representar produto ainda não contado.

O script está preparado; a alteração na sua planilha depende de você executar atualizarFarol e atualizar a implantação.
