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
 * Request sent to server to update account password
 * @export
 * @interface UpdateAccountPasswordRequest
 */
export interface UpdateAccountPasswordRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateAccountPasswordRequest
     */
    passwordNew: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAccountPasswordRequest
     */
    passwordCurrent: string;
}

/**
 * Check if a given object implements the UpdateAccountPasswordRequest interface.
 */
export function instanceOfUpdateAccountPasswordRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "passwordNew" in value;
    isInstance = isInstance && "passwordCurrent" in value;

    return isInstance;
}

export function UpdateAccountPasswordRequestFromJSON(json: any): UpdateAccountPasswordRequest {
    return UpdateAccountPasswordRequestFromJSONTyped(json, false);
}

export function UpdateAccountPasswordRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateAccountPasswordRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'passwordNew': json['password_new'],
        'passwordCurrent': json['password_current'],
    };
}

export function UpdateAccountPasswordRequestToJSON(value?: UpdateAccountPasswordRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'password_new': value.passwordNew,
        'password_current': value.passwordCurrent,
    };
}
