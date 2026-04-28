export declare const AT_FILTEREDLIST = "@FILTERED_LIST";
export declare const AT_PROPERTY = "@P";
/**
 * [getFieldNameFromEmbeddedFieldName]
 * Description    -               converting embeddedField name starting with !P! or !PL! to normal field
 * @ignore
 * @param {string} propertyName   EmbeddedField name starting with !P! or !PL!
 * @returns {string}              returns converted string without !P! or !PL! and :
 *
 * @example <caption>Example for getFieldNameFromEmbeddedFieldName </caption>
 * getFieldNameFromEmbeddedFieldName('!P!Organisation:Name') return 'Organisation.Name'
 * getFieldNameFromEmbeddedFieldName('!PL!Employees:Name') return 'Employees.Name'
 */
export declare function getFieldNameFromEmbeddedFieldName(propertyName: any): any;
/**
 * [getEmbeddedFieldName]
 * Description    -               converting normal field name to embedded field starting with !P! or !PL!
 * @ignore
 * @param {string} propertyName   Field name
 * @param {string} classID        classID of datapage
 * @returns {string}              returns converted string with !P! or !PL! and :
 *
 * @example <caption>Example for getEmbeddedFieldName </caption>
 * For page property, getEmbeddedFieldName('Organisation.Name') return '!P!Organisation:Name'
 * For pageList property, getEmbeddedFieldName('Employees.Name') return '!PL!Employees:Name'
 */
export declare function getEmbeddedFieldName(propertyName: any, classID: any): any;
/**
 * [updateMetaEmbeddedFieldID]
 * Description    -           If the fieldID in meta starts with '!P!' or '!PL!' and contains ':' then replace them with .(dot)
 * @ignore
 * @param {Array} metaFields  Fields metadata Array. Contains metadata of all the fields.
 */
export declare function updateMetaEmbeddedFieldID(metaFields: any): any;
/**
 * [getConfigEmbeddedFieldsMeta]
 * Description    -           Get the metadata for configured embedded fields
 * @ignore
 * @param {Set} configFields  Set of config fields
 * @param {string} classID    clasID of datapage
 * @returns {Array}           Metadata of configured embedded fields
 */
export declare function getConfigEmbeddedFieldsMeta(configFields: any, classID: any): any[];
/**
 * [mergeConfigEmbeddedFieldsMeta]
 * Description    -           Get the metadata for configured embedded fields
 * @ignore
 * @param {Array} configEmbeddedFieldsMeta  config fields metadata.
 * @param {Array} metaFields  Fields metadata Array. Contains metadata of all the fields
 */
export declare function mergeConfigEmbeddedFieldsMeta(configEmbeddedFieldsMeta: any, metaFields: any): any[];
/**
 * [preparePropertyValue]
 * Description    -        Preparing pageList value from FILTERED_LIST annotation to Property annotation
 * @ignore
 * @param {string} value   Pagelist value starts with FILTERED_LIST annotation
 * @returns {string}       returns converted string starting with Property annotation
 *
 * @example <caption>Example for preparePropertyValue </caption>
 * preparePropertyValue('@FILTERED_LIST .Employees[].Name') return '@P .Employees.Name'
 */
export declare function preparePropertyValue(value: any): any;
/**
 * [updatePageListFieldsConfig]
 * Description    -        updating configured pageList property's type and value
 * @ignore
 * @param {Array} configFields  configured fields
 *
 * @example <caption>Modified config pageListField </caption>
 *
    {
      "type": "ScalarList",
      "config": {
        "value": "@FILTERED_LIST .Employees[].Name",
        "label": "@L Emp_Name",
        "componentType": "TextInput",
        "readOnly": true
      }
    }
    modified to
    {
      "type": "TextInput",
      "config": {
        "value": "@P .Employees.Name",
        "label": "@L Emp_Name",
        "componentType": "TextInput",
        "readOnly": true
      }
    }
 */
export declare function updatePageListFieldsConfig(configFields: any): any;
/**
 * Update the renderer type for the properties of type Page.
 */
export declare function updatePageFieldsConfig(configFields: any, parentClassID: any): any;
export declare function updateChangeSetValueKeys(changeSetObj: any, getOriginalProperty: any): {};
/**
 * [isPageListProperty]
 * Description    -        checking if propertyName is pageList or not
 * @ignore
 * @param {string} propertyName   PropertyName
 * @returns {boolean}  true if property is pageList else false
 *
 * @example <caption>Example for isPageListProperty </caption>
 * isPageListProperty('!PL!Employees.Name') return true
 * isPageListProperty('!P!Employees.Name') return false
 * isPageListProperty('Name') return false
 */
export declare function isPageListProperty(propertyName: any): any;
/**
 * [preparePropertyMaps]
 * Description    -        preparing maps for property names and set it in dataApi context
 * @ignore
 * @param {Array} fields   fields array
 * @param {string} classID  classID of datapage
 * @param {string} context  dataApi context
 * @returns {boolean} true if pageListProperty is present
 */
export declare function preparePropertyMaps(fields: any, classID: any, context: any): any;
/**
 * [getPageListFields]
 * Description    -        getting pageListFields names from the fields
 * @ignore
 * @param {Array} fields   fields array
 * @returns {Array} array of pageListFields name
 */
export declare function getPageListFields(fields: any): any[];
export declare function mergePageListFieldAggregation(pageListName: any, select: any, existingAggregations: any, existingAggregationsName: any): void;
export declare function mergePageListFieldsAggregation(fields: any, select: any, existingAggregations: any): any[];
/**
 * [hasPageListProperty]
 * Description    -        getting pageListFields names from the fields
 * @ignore
 * @param {Array} fieldDefs   fields array
 * @returns {object | undefined} value of first pageListProperty found
 */
export declare function hasPageListProperty(fieldDefs: any): any;
//# sourceMappingURL=embed-utils.d.ts.map