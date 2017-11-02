export function timestampToString (timestamp) {
  const a = new Date(timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return a.getDate() + '-' + months[a.getMonth()] + '-' + a.getFullYear() + ' ' +
    a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
}
