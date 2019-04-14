class AppLibrary {
  async get(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }
}
