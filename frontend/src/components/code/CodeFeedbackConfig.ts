// Language detection configuration
export const LANGUAGE_PATTERNS = {
  reactComponent: { pattern: /<[A-Z][A-Za-z0-9]*/, result: (hasTypes: boolean) => hasTypes ? 'tsx' : 'jsx' },
  typescript: { pattern: /interface\s+\w+|type\s+\w+\s*=|:\s*\w+/, result: () => 'typescript' },
  default: 'javascript'
};

// Helper functions
export const isSubstantialCode = (content: string): boolean => {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  return lines.length >= 3 || content.length >= 50;
};

export const detectLanguage = (code: string, declaredLang?: string): string => {
  if (declaredLang && declaredLang !== '') return declaredLang;
  
  // Check for React/JSX
  if (LANGUAGE_PATTERNS.reactComponent.pattern.test(code) || /className=/.test(code)) {
    return LANGUAGE_PATTERNS.reactComponent.result(/:\s*\w+/.test(code));
  }
  
  // Check for TypeScript
  if (LANGUAGE_PATTERNS.typescript.pattern.test(code)) {
    return LANGUAGE_PATTERNS.typescript.result();
  }
  
  return LANGUAGE_PATTERNS.default;
};

// Code styling
export const getCodeStyle = (theme: string) => ({
  backgroundColor: theme === 'dark' ? '#27272a' : '#f8f8f8',
  color: theme === 'dark' ? '#e4e4e7' : '#374151',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.8rem',
  lineHeight: '1.5',
  padding: '16px',
  borderRadius: '8px',
  overflowX: 'auto' as const,
});