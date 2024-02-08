let serverUrl = '';
if (process.env.NODE_ENV === 'development') {
  serverUrl = 'http://localhost:5000';
}

export { serverUrl };