window.addEventListener('message', (event) => {
  if (event.source !== window || event.data.type !== 'APPLY_DEAL') return;

  const deal = JSON.parse(event.data.data);

  

  console.log("Received message from extension:", deal);
});
