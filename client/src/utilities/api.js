class CarApiError extends Error {
    constructor(message, details) {
      super(message);
      this.name = 'CarAPI ' + this.name;
      this.details = details;
    }
  }
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const request = async (method, url, body = null) => {
    const options = body ? { method, headers, body: JSON.stringify(body) } : { method };
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (!response.ok) {
      throw new CarApiError(data.error.message, data.error.details);
    }
  
    return data;
  };
  
  export {
    CarApiError,
    request
  };
  