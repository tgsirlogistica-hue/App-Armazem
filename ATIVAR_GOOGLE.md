# Ativar salvamento na planilha Google

Planilha de destino: https://docs.google.com/spreadsheets/d/1KId1ySZvP0AQ6nIPuc3eSvcNZNu9DRubrD5giHnKJkI/edit

1. Abra a planilha na conta que tem permissão para editá-la.
2. Clique em **Extensões → Apps Script**.
3. Copie todo o conteúdo de `Codigo.gs` deste pacote para o editor. Se já houver código, use um projeto independente em https://script.google.com para não substituir seu código existente.
4. Salve. Selecione a função **prepararPlanilha** e clique em **Executar**. Autorize o acesso solicitado pelo Google. A função cria a aba CONTAGENS; não apaga outras abas.
5. Clique em **Implantar → Nova implantação → Aplicativo da Web**.
6. Configure **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**. Algumas contas corporativas não permitem essa opção; nesse caso é necessário ajustar o acesso com o administrador.
7. Clique em **Implantar** e copie a URL terminada em `/exec`.
8. Abra `config.js` e cole a URL entre as aspas de `GOOGLE_SCRIPT_URL`. Exemplo: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_ID/exec';`
9. No GitHub, atualize index.html, app.js e envie config.js e google.js, além dos demais arquivos do site. `Codigo.gs` é usado no Apps Script e não precisa ir ao GitHub.
10. Abra o site publicado, registre um produto, acione Salvar contagem, informe o responsável e clique em **Salvar na planilha Google**.
11. Aguarde **Contagem confirmada na planilha Google** e confira a linha na aba CONTAGENS. O teste completo depende desta publicação.

## Funcionamento
O botão Salvar produto registra o rascunho neste aparelho. Salvar na planilha Google envia todos os registros ainda pendentes. O envio confirmado marca os registros; novas contagens podem ser enviadas depois. O mesmo ID não é gravado novamente se houver falha na confirmação e você tentar de novo. Dois lançamentos separados do mesmo produto são duas contagens distintas.

Não existe edição nem exclusão de linhas do Google pelo site: as correções de registros enviados são feitas na planilha. O site não baixa as contagens feitas em outros aparelhos; todas podem ser consultadas na planilha central.

O endpoint permite inclusão sem login, para funcionar no GitHub Pages. Quem tiver a URL de implantação pode enviar registros, mas o código não fornece leitura da planilha. Não publique dados que exijam autenticação neste formato. A planilha pode continuar privada. As conversões vêm da base local enviada pelo site; o servidor valida os números e o total, mas não tem uma segunda cópia do catálogo.

Para atualizar Codigo.gs depois, use Implantar → Gerenciar implantações → Editar → Nova versão. Não basta salvar o código no editor.
