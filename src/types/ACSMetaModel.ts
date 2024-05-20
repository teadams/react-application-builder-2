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
  /** Named used in the UI.  Defaults to name. */
  prettyName?: string;
  /** Description of field if not self expanatory */
  description?: string;
  /** Additional instructions */
  instructions?: string;
  helpText?: string;
  /** The following are attributes of input fields */
  placeholder?: string;
  viewPlaceholder?: string;
  autocomplete?: string;
  disabled?: boolean;

  /** Is this field a denormalization?  Denormalization can make read queries
   * easier to program and save db resources.  However, the values must
   * be maintained if related data changes.
   */
  denormalized?: boolean;
  /** Object.field used to maintain the denormalization.  For FUTURE use.
   *  Later, we can automated adding this value to create/update stagements.
   *  This is not programmed yet.
   */
  denormalizedReference?: string;
  /** Imformation about how to create/maintain the denormalization */
  denormalizationInstructions?: string;
  /** the type attriubute for the input field */
  inputType?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
  /** Component to render */
  component?: "Text" | "TextArea" |  "RichText" | "Select" | "MultiSelect" | "Checkbox" | "Radio" | "Date" | "DateTime" | "Avatar" | "Upload" | "Custom";
  /** If using a custom component, the name */
  customComponent?: string;
  /** If a textarea, number of rows and cols. */
  rows?: number;
  cols?: number;

  /**  data Type for the field.  THis is not alawys the database type
   * because it is often more specific. default string */
  dataType?:
    | "string"
    | "image"
    | "uuid"
    | "url"
    | "file"
    | "timestamp"
    | "integer"
    | "boolean"
    | "array"
    | "json"
    | "object";
  /** specialized UI Coponent */
  uiComponent?: "richText" | "textArea";
  /** If textArea, number of rows */
  numRows?: number;
  /** array containing valid values  */
  validValues?: any[];
  /** True if this column should be indexed */
  indexed?: boolean;
  /** True if this is a required field. Default false */
  required?: boolean;
  /** default value of field.  If this is a date field, use now for the current date/time.
   *  Specify "" for empty string, which is distinct from null.
   */
  defaultValue?: any;
  /** If true, this column will be autoincremented
   * by a sequence
   */
  readonly?: boolean;
  serial?: boolean;
  /** True if this field can not be edited */
  readOnly?: boolean;
  /** True if the system generates this field. (it will also be marked readOnly) */
  systemGenerated?: boolean;
  /** True if this column is unique */
  unique?: boolean;
  /** Shorthand to specify referecesTable and referencesFiel.
   * Object type and field this references. ie - acsUsers.id  - If field is missing, id will be used */
  references?: string;
  /** Table referenced */
  referencesTable?: string;
  /** Field referenced in data. Default is id */
  referencesField?: string;
  /** Field to display.  Defaults to referencesField*/
  referencesDisplayField?: string;
  /** If true, will be automatically encrypted in request processing
   * and encrypted again when entered into the db
   */
  encrypted?: true;
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
