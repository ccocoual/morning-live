export const getHash = (hash) =>
  hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
