// ACS Enterprise Core
// Metadata Module
// Copyright © 2019-2023 ACSPropel. All rights reserved.
// author - Tracy Adams

/** Attributes provided for application */
export interface ACSAppParams {
  /**  Name of service */
  name: string;
  /** database table will be prepended with this description. Can not be changed. */
  key: string;
  /** If not null, inherit metaModel from parent. Can go unlimited levels */
  parentKey?: string;
}


export interface ACSIndexType {
  fields: string[];
  unique?: boolean;
}
/** Attributes provided for each object type */
export interface ACSObjectType {
  /** The table name will be named after the key.
   * This name field is added when the meta model is loaded
   * for convience. This allows a programmer to use objectType.name
   * when the key is not known. A denormalization for convenience
   */
  name?: string;
  /** db table name if overriden- default calculated from name and dbPrefix */
  dbTableName?: string;
  /** user interface name */
  prettyName: string;
  /** user interface plural */
  prettyPlural: string;
  description?: string;
  indexes?: ACSIndexType[];
  /** fields in this object */
  fields: ACSObjectFields;
}

export interface ACSObjectTypes {
  /** Keyed by object type name */
  [index: string]: ACSObjectType;
}

/** Attributes provided for each field */
export interface ACSField {
  /** The table name will be named after the key.
   * This name field is added when the meta model is loaded
   * for convience. This allows a programmer to use objectType.name
   * when the key is not known. A denormalization for convenience
   */
  name?: string;
  /**  This objectType fields is added when the meta model is loaded.
   *  A denormalization for convenience*/
  objectType?: string;
  prettyName: string;
  /** Description of field if not self expanatory */
  description?: string;
  /**  data Type for the field.  THis is not alawys the database type
   * because it is often more specific. */
  dataType:
    | "string"
    | "image"
    | "url"
    | "file"
    | "timestamp"
    | "integer"
    | "boolean"
    | "array"
    | "json";
  /** array containing valid values  */
  validValues?: any[];
  /** True if this column should be indexed */
  indexed?: boolean;
  /** True if this is a required field */
  required: boolean;
  /** default value of field.  If this is a date field, use now for the current date/time.
   *  Specify "" for empty string, which is distinct from null.
   */
  defaultValue?: any;
  /** If true, this column will be autoincremented
   * by a sequence
   */
  serial?: boolean;
  /** True if this column is unique */
  unique?: boolean;
  /** object type and field this references */
  references?: string;
}

/**
 * Fields for one object
 */
export interface ACSObjectFields {
  /** keyed by field name */
  [index: string]: ACSField;
}

/** Metadata model to run the application. Format:
 *
 *  {
 *   appParams: {param1:value, param2:value}
 *   objectTypes: {
 *       objectType1:
 *          { attribute1:value,
 *            attribute2:value,
 *            fields: {
 *              field1: {attriBute1value, attribute2:value},
 *              field2: {attriBute1value, attribute2:value}
 *            }
 *       objectType2:
 *          { attribute1:value,
 *            attribute2:value,
 *            fields: {
 *              field1: {attriBute1value, attribute2:value},
 *              field2: {attriBute1value, attribute2:value}
 *            }
 *          }
 *   }
 * }
 *
 */

export interface ACSMetaModel {
  appParams: ACSAppParams;
  objectTypes: ACSObjectTypes;
}

export default ACSMetaModel;
