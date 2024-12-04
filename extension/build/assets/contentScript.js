chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'APPLY_DEAL') {
    window.postMessage({ type: 'APPLY_DEAL', data: message.data }, '*');
    sendResponse({ status: "Message sent to webpage" });
  }
});
