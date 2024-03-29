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

/**
 * 
 * @export
 * @enum {string}
 */
export enum UserStatus {
    offline = 'offline',
    doNotDisturb = 'doNotDisturb',
    inactive = 'inactive',
    online = 'online'
}


export function UserStatusFromJSON(json: any): UserStatus {
    return UserStatusFromJSONTyped(json, false);
}

export function UserStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserStatus {
    return json as UserStatus;
}

export function UserStatusToJSON(value?: UserStatus | null): any {
    return value as any;
}

