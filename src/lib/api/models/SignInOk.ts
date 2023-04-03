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
 * 
 * @export
 * @interface SignInOk
 */
export interface SignInOk {
    /**
     * 
     * @type {string}
     * @memberof SignInOk
     */
    sessionId?: string;
    /**
     * 
     * @type {Date}
     * @memberof SignInOk
     */
    issuedAtUtc?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SignInOk
     */
    expiresAtUtc?: Date;
}

/**
 * Check if a given object implements the SignInOk interface.
 */
export function instanceOfSignInOk(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SignInOkFromJSON(json: any): SignInOk {
    return SignInOkFromJSONTyped(json, false);
}

export function SignInOkFromJSONTyped(json: any, ignoreDiscriminator: boolean): SignInOk {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sessionId': !exists(json, 'sessionId') ? undefined : json['sessionId'],
        'issuedAtUtc': !exists(json, 'issuedAtUtc') ? undefined : (new Date(json['issuedAtUtc'])),
        'expiresAtUtc': !exists(json, 'expiresAtUtc') ? undefined : (new Date(json['expiresAtUtc'])),
    };
}

export function SignInOkToJSON(value?: SignInOk | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sessionId': value.sessionId,
        'issuedAtUtc': value.issuedAtUtc === undefined ? undefined : (value.issuedAtUtc.toISOString()),
        'expiresAtUtc': value.expiresAtUtc === undefined ? undefined : (value.expiresAtUtc.toISOString()),
    };
}

