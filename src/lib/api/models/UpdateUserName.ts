/* tslint:disable */
/* eslint-disable */
/**
 * ZapMe
 * Open source application to control things
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Request sent to server to update account username
 * @export
 * @interface UpdateUserName
 */
export interface UpdateUserName {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserName
     */
    newUsername: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserName
     */
    password: string;
}

/**
 * Check if a given object implements the UpdateUserName interface.
 */
export function instanceOfUpdateUserName(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "newUsername" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function UpdateUserNameFromJSON(json: any): UpdateUserName {
    return UpdateUserNameFromJSONTyped(json, false);
}

export function UpdateUserNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserName {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'newUsername': json['newUsername'],
        'password': json['password'],
    };
}

export function UpdateUserNameToJSON(value?: UpdateUserName | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'newUsername': value.newUsername,
        'password': value.password,
    };
}

