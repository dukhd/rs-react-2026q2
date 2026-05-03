class LocalStorageService {
  save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    const value = localStorage.getItem(key);
    return value;
  }
}

export default new LocalStorageService();
