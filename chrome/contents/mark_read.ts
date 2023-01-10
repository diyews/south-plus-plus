chrome.storage.local.get('configLocal', items => {
  const config = items.configLocal;
  console.log(config);
})
