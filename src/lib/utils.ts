const arrayOfJsonToObject = (
  array: Record<string, unknown>[],
  keyAttribute: string
) => {
  const object = {} as Record<string, Record<string, unknown>>;
  for (const element of array) {
    const key = element[keyAttribute] as string;
    object[key as string] = element;
  }
  return object;
};

export default { arrayOfJsonToObject };
