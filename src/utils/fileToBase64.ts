export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to convert file to the Base64 string'));
      }
    };

    fileReader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };
  });
};
