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
 * @interface ProviderDataDto
 */
export interface ProviderDataDto {
    /**
     * 
     * @type {string}
     * @memberof ProviderDataDto
     */
    providerName: string;
    /**
     * 
     * @type {string}
     * @memberof ProviderDataDto
     */
    userName: string;
    /**
     * 
     * @type {string}
     * @memberof ProviderDataDto
     */
    email: string;
    /**
     * 
     * @type {boolean}
     * @memberof ProviderDataDto
     */
    emailVerified: boolean;
    /**
     * 
     * @type {Date}
     * @memberof ProviderDataDto
     */
    expiresAtUtc: Date;
}

/**
 * Check if a given object implements the ProviderDataDto interface.
 */
export function instanceOfProviderDataDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "providerName" in value;
    isInstance = isInstance && "userName" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "emailVerified" in value;
    isInstance = isInstance && "expiresAtUtc" in value;

    return isInstance;
}

export function ProviderDataDtoFromJSON(json: any): ProviderDataDto {
    return ProviderDataDtoFromJSONTyped(json, false);
}

export function ProviderDataDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProviderDataDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'providerName': json['providerName'],
        'userName': json['userName'],
        'email': json['email'],
        'emailVerified': json['emailVerified'],
        'expiresAtUtc': (new Date(json['expiresAtUtc'])),
    };
}

export function ProviderDataDtoToJSON(value?: ProviderDataDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'providerName': value.providerName,
        'userName': value.userName,
        'email': value.email,
        'emailVerified': value.emailVerified,
        'expiresAtUtc': (value.expiresAtUtc.toISOString()),
    };
}

