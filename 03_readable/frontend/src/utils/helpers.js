export function timestampToString (timestamp) {
  const a = new Date(timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return a.getDate() + '-' + months[a.getMonth()] + '-' + a.getFullYear() + ' ' +
    a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
}

// This function calculates an uuid v4 complaint.
// Credit: https://stackoverflow.com/a/2117523/3687310
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}
