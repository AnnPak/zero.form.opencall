export const request = async (url, body, method) => {
  const requestOptions = {
      method: method ? method : "GET",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: body ? body : null,
  };

  return fetch(url, requestOptions).then((response) => {
      // if (!response.ok) {
      //     throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      // }
      return response.json();
  });
};