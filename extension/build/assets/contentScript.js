chrome.runtime.onMessage.addListener((e,s,t)=>{e.type==="APPLY_DEAL"&&(window.postMessage({type:"APPLY_DEAL",data:e.data},"*"),t({status:"Message sent to webpage"}))});
