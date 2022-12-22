export const request = async (url, body, method) => {
  const requestOptions = {
      method: method ? method : "GET",
      headers: { 
        "Content-Type": "application/json",
      },
      body: body ? body : null,
  };
  console.log(requestOptions)

  return fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }else{
        console.log(response)

      }
      return response.json();
  });
};