import { indexOf, uniq } from "lodash";

/**
 * 
 * @param obj 
 * @param path
 * 
 * Given a path string, return the value of the object at that path.  
 */
const getDeepValueFromString = (obj: Record<string, unknown>, path: string) => {
  const pathArray = path.split(".")
  for (let i = 0; i < pathArray.length; i++) {
    if (i < pathArray.length - 1) {
      obj = obj[pathArray[i]] as Record<string, unknown>
    }    
  }
  return obj[pathArray[pathArray.length - 1]]

}

const sort = (array: Record<string, unknown>[], sortBy: string | undefined, sortOrder: string = "asc") => {
  if (!sortBy) return array
  console.log("sort", sortBy, sortOrder, array  )
  const result =  array.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      return sortOrder === "asc" ? 
        (a[sortBy] as string) > (b[sortBy] as string) ? 1 : -1 :  
        (a[sortBy] as string) < (b[sortBy] as string) ? 1 : -1
  });
  console.log("result", result)
  return result
}

/*** converts an array to a
 * JSON object keyed by keyAttribute
 */
export const arrayOfJsonToObject = (
  array: Record<string, unknown>[],
  keyAttribute: string
) => {
  const object = {} as Record<string, Record<string, unknown>>;
  for (const element of array) {
    const key = element[keyAttribute] as string;
    object[key as number | string] = element;
  }
  return object;
};

export const getElementsByAttribute = (
  array: Record<string, unknown>[],
  value: unknown,
  attribute: string
) => {
  const selectedElement =
    array.filter((element: any) => element[attribute] === value) ?? [];

  return selectedElement;
};

export const getElementByAttribute = (
  array: Record<string, unknown>[],
  value: unknown,
  attribute: string
) => {
  const selectedElement =
    array.filter((element: any) => element[attribute] === value)[0] ?? {};

  return selectedElement;
};

export const getElementById = (
  array: Record<string, unknown>[],
  value: unknown
) => {
  return getElementByAttribute(array, value, "id");
};

export const uniqueByAttribute = (
  array: Record<string, unknown>[],
  attribute = "id"
) => {
  return array
    .map((row) => row[attribute])
    .filter((value, index, self) => self.indexOf(value) === index);
};

export const uniqueIds = (array: Record<string, unknown>[]): unknown[] => {
  return uniqueByAttribute(array, "id");
};

export const indexOfByAttribute = (
  array: Record<string, unknown>[],
  value: unknown,
  attribute = "id"
) => {
  let i = 0;
  for (const element of array) {
    if (element[attribute as string] === value) {
      return i;
    }
    i++;
  }
};

export const indexOfById = (
  array: Record<string, unknown>[],
  value: unknown
) => {
  return indexOfByAttribute(array, value, "id");
};

export const reverse = (arrays: unknown[]): unknown[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return arrays.reduce((acc, item) => [item].concat(acc), []);
};

export default {
  getDeepValueFromString,
  arrayOfJsonToObject,
  getElementByAttribute,
  getElementsByAttribute,
  getElementById,
  uniqueIds,
  uniqueByAttribute,
  indexOfByAttribute,
  indexOfById,
  reverse,
  sort
};
