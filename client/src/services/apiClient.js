const BASE_URL = "/api";

/**
 * Helper function for making fetch requests
 * @param {String} url url-end point for request
 * @param {JSON} options options for request: meta-data, body, etc.
*/
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)
    }

    const isJson = (response.headers.get('content-type') || '').includes('application/json')
    let data = isJson ? await response.json() : await response.text()

    return [data, null];
  }
  catch (error) {
    console.error(error.message);

    return [null, error];
  }
}

export default fetchData;
