const PLANILHA_ID = '1KId1ySZvP0AQ6nIPuc3eSvcNZNu9DRubrD5giHnKJkI';
const ABA = 'CONTAGENS';
const CABECALHO = ['ID','Recebido em','Contado em','Responsável','Tipo','Código','Produto','Paletes','Lastros','Caixas soltas','Caixas por palete','Caixas por lastro','Total em caixas','Observação'];
function prepararPlanilha(){
 const ss=SpreadsheetApp.openById(PLANILHA_ID);
 const s=ss.getSheetByName(ABA)||ss.insertSheet(ABA);
 if(s.getLastRow()===0){s.appendRow(CABECALHO);s.setFrozenRows(1);s.getRange(1,1,1,CABECALHO.length).setFontWeight('bold');}
 if(JSON.stringify(s.getRange(1,1,1,CABECALHO.length).getValues()[0])!==JSON.stringify(CABECALHO))throw Error('A aba CONTAGENS tem cabeçalho diferente. Renomeie essa aba e tente novamente.');
 return s;
}
function texto_(v,max){if(typeof v!=='string'||v.length>max)throw Error('Campo de texto inválido');return /^[=+@-]/.test(v)?"'"+v:v;}
function inteiro_(v){if(!Number.isSafeInteger(v)||v<0)throw Error('Quantidade inválida');return v;}
function doPost(e){
 let p={},res={tipo:'tgr-contagem',ok:false};
 try{
  if(!e.parameter.payload||e.parameter.payload.length>1000000)throw Error('Envio muito grande');
  p=JSON.parse(e.parameter.payload);res.nonce=texto_(p.nonce,100);
  if(!/^https:\/\/[a-zA-Z0-9.-]+(?::\d+)?$/.test(p.origin))throw Error('Origem inválida');
  const responsavel=texto_(p.responsavel,100);if(!responsavel.trim())throw Error('Informe o responsável');
  if(!Array.isArray(p.registros)||!p.registros.length||p.registros.length>2000)throw Error('Lote inválido');
  const rows=p.registros.map(r=>{
   const id=texto_(r.id,100);if(!id)throw Error('ID ausente');
   if(!['estoque','avarias'].includes(r.tipo))throw Error('Tipo inválido');
   const pal=inteiro_(r.palete),las=inteiro_(r.lastro),cx=inteiro_(r.caixa);
   const pp=inteiro_(r.porPalete==null?0:r.porPalete),pl=inteiro_(r.porLastro==null?0:r.porLastro);
   if((pal&&!pp)||(las&&!pl))throw Error('Conversão ausente');
   const total=inteiro_(pal*pp+las*pl+cx);if(total!==r.total)throw Error('Total inconsistente');
   const data=new Date(r.data);if(isNaN(data.getTime()))throw Error('Data inválida');
   return [id,new Date(),data,responsavel,r.tipo,texto_(r.codigo,50),texto_(r.nome,250),pal,las,cx,pp,pl,total,texto_(r.observacao||'',500)];
  });
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try{const s=prepararPlanilha();const ids=new Set(s.getLastRow()>1?s.getRange(2,1,s.getLastRow()-1,1).getValues().flat():[]);const novos=rows.filter(r=>{if(ids.has(r[0]))return false;ids.add(r[0]);return true});if(novos.length)s.getRange(s.getLastRow()+1,1,novos.length,CABECALHO.length).setValues(novos);SpreadsheetApp.flush();res.ok=true;res.ids=rows.map(r=>r[0]);}finally{lock.releaseLock()}
 }catch(err){res.erro=String(err.message||err).slice(0,300)}
 const json=JSON.stringify(res).replace(/</g,'\\u003c');
 const origin=JSON.stringify(/^https:\/\/[a-zA-Z0-9.-]+(?::\d+)?$/.test(p.origin||'')?p.origin:'https://invalid.example');
 return HtmlService.createHtmlOutput('<!doctype html><html><body><p>'+ (res.ok?'Contagem salva.':'Envio não confirmado.')+'</p><script>const resposta='+json+';window.parent.postMessage(resposta,'+origin+');window.top.postMessage(resposta,'+origin+');</script></body></html>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function doGet(){return HtmlService.createHtmlOutput('Integração TGR ativa. Envie a contagem pelo site.');}
