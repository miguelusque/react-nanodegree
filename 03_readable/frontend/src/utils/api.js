const SERVER = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';
const HEADERS = { headers: { 'Authorization': 'Lorem ipsum' } };

// This method retrieves the list of posts (by category if not empty).
export const fetchPosts = (category = '') => {
  const url = category === '' ? 
    `${SERVER}/posts` : 
    `${SERVER}/:${category}/posts`;

  return fetch(url, HEADERS)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method retrieved the list of categories.
export const fetchCategories = () => {
  const url = `${SERVER}/categories`;
  
  return fetch(url, HEADERS)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}
