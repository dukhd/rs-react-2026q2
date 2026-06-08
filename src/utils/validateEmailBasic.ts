export const validateEmailBasic = (value: string) => {
  const email = value.trim();
  if (email.length === 0) return false;
  if (email.includes('..')) return false;
  for (let i = 0; i < email.length; i++) {
    const code = email.charCodeAt(i);

    const isLowerLatin = code >= 97 && code <= 122;
    const isUpperLatin = code >= 65 && code <= 90;
    const isDigit = code >= 48 && code <= 57;
    const isAllowedSpec = code === 64 || code === 46 || code === 95 || code === 45;

    if (!isLowerLatin && !isUpperLatin && !isDigit && !isAllowedSpec) {
      return false;
    }
  }
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const [local, domain] = parts;
  if (!local || !domain) return false;
  if (domain.startsWith('.')) return false;
  if (domain.endsWith('.')) return false;
  if (local.endsWith('.')) return false;

  return domain.includes('.');
};
