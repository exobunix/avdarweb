export function getBlockValue<T>(
  blocks: { key: string; value: any }[] | undefined,
  key: string,
  defaultVal: T
): T {
  const block = blocks?.find((b) => b.key === key);
  if (!block || !block.value) return defaultVal;
  
  // Merge properties safely
  if (typeof defaultVal === "object" && defaultVal !== null) {
    return { ...defaultVal, ...block.value } as T;
  }
  return block.value as T;
}
