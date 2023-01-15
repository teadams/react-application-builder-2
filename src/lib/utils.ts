import { uniq } from "lodash";

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
    object[key as string] = element;
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

export default {
  arrayOfJsonToObject,
  getElementByAttribute,
  getElementsByAttribute,
  getElementById,
  uniqueIds,
  uniqueByAttribute,
};
