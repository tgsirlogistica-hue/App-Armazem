let envioPendente=null;
function enviarGoogle(){
 if(envioPendente)return;
 if(!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(GOOGLE_SCRIPT_URL)){alert('Configure a URL do Apps Script no arquivo config.js.');return}
 const responsavel=$('responsavel').value.trim();if(!responsavel){$('responsavel').focus();alert('Informe o responsável.');return}
 const pendentes=registros.filter(r=>!r.enviado);if(!pendentes.length){$('aviso').textContent='Não há registros pendentes de envio.';return}
 if(location.protocol!=='https:'&&location.hostname!=='localhost'){alert('Abra o endereço publicado no GitHub para enviar à planilha.');return}
 const nonce=crypto.randomUUID(),frame=document.createElement('iframe');frame.name='envio_'+nonce;frame.hidden=true;document.body.append(frame);
 const form=document.createElement('form');form.method='POST';form.action=GOOGLE_SCRIPT_URL;form.target=frame.name;
 const input=document.createElement('input');input.type='hidden';input.name='payload';input.value=JSON.stringify({nonce,origin:location.origin,responsavel,registros:pendentes});form.append(input);document.body.append(form);
 envioPendente={nonce,ids:pendentes.map(r=>r.id),frame,form};$('enviarGoogle').disabled=true;$('aviso').textContent='Enviando à planilha…';form.submit();
 envioPendente.timer=setTimeout(()=>finalizarEnvio('Sem confirmação do Google. Seus registros continuam no aparelho; tente novamente. O envio repetido não duplica os mesmos registros.'),60000);
}
function finalizarEnvio(msg){if(envioPendente){clearTimeout(envioPendente.timer);envioPendente.frame.remove();envioPendente.form.remove();envioPendente=null}$('enviarGoogle').disabled=false;$('aviso').textContent=msg}
window.addEventListener('message',e=>{
 if(!/^https:\/\/([\w-]+\.)*googleusercontent\.com$/.test(e.origin)&&e.origin!=='https://script.google.com')return;
 const d=e.data;if(!envioPendente||!d||d.nonce!==envioPendente.nonce||d.tipo!=='tgr-contagem')return;
 if(d.ok&&Array.isArray(d.ids)&&envioPendente.ids.every(id=>d.ids.includes(id))){const ids=new Set(d.ids);registros.forEach(r=>{if(ids.has(r.id))r.enviado=true});persistir();finalizarEnvio('Contagem confirmada na planilha Google.');resumo()}
 else finalizarEnvio('Não foi possível confirmar o envio: '+(d.erro||'resposta incompleta')+'. O rascunho foi mantido.');
});
