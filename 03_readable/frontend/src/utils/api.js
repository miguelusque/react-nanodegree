const SERVER = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001';
const HEADERS = { headers: { 'Authorization': 'Lorem ipsum' } };

// This method retrieves the list of posts (by category if not empty).
export const fetchPosts = (category = '') => {
  const url = category === '' ?
    `${SERVER}/posts` :
    `${SERVER}/:${category}/posts`;

  return fetch(url, HEADERS)
    .then(checkStatus)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method retrieved the list of categories.
export const fetchCategories = () => {
  const url = `${SERVER}/categories`;

  return fetch(url, HEADERS)
    .then(checkStatus)
    .then(res => (res.ok ? res.json() : []))
    .catch(() => []);
}

// This method updates a post
export const putUpdatedPost = updatedFields => {
  const url = `${SERVER}/posts/:${updatedFields.id}`;

  return fetch(url,
    {...HEADERS,
      method: 'PUT',
      body: JSON.stringify(updatedFields)
    })
    .then(checkStatus);
}

// This method handles response status
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
