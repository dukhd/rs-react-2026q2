class LocalStorageService {
  save(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    const value = window.localStorage.getItem(key);
    return value;
  }
}

export default new LocalStorageService();
