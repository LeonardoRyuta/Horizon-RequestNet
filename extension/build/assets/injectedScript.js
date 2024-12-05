window.addEventListener("message",e=>{if(e.source!==window||e.data.type!=="APPLY_DEAL")return;const a=JSON.parse(e.data.data);console.log("Received message from extension:",a)});
