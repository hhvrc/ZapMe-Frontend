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
import type { UserStatus } from './UserStatus';
import {
    UserStatusFromJSON,
    UserStatusFromJSONTyped,
    UserStatusToJSON,
} from './UserStatus';

/**
 * Account object, this can only retrieved for the user you are logged in as
 * @export
 * @interface AccountDto
 */
export interface AccountDto {
    /**
     * 
     * @type {string}
     * @memberof AccountDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AccountDto
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof AccountDto
     */
    email: string;
    /**
     * 
     * @type {boolean}
     * @memberof AccountDto
     */
    emailVerified: boolean;
    /**
     * 
     * @type {number}
     * @memberof AccountDto
     */
    acceptedPrivacyPolicyVersion: number;
    /**
     * 
     * @type {number}
     * @memberof AccountDto
     */
    acceptedTermsOfServiceVersion: number;
    /**
     * 
     * @type {string}
     * @memberof AccountDto
     */
    avatarUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AccountDto
     */
    bannerUrl?: string | null;
    /**
     * 
     * @type {UserStatus}
     * @memberof AccountDto
     */
    status: UserStatus;
    /**
     * 
     * @type {string}
     * @memberof AccountDto
     */
    statusText: string;
    /**
     * Ids of users this account has friended
     * @type {Array<string>}
     * @memberof AccountDto
     */
    friendUserIds: Array<string>;
    /**
     * SSO providers this account is connected to
     * @type {Array<string>}
     * @memberof AccountDto
     */
    ssoConnections: Array<string>;
    /**
     * Date this user was created at
     * @type {Date}
     * @memberof AccountDto
     */
    createdAt: Date;
    /**
     * Last time this user was updated
     * @type {Date}
     * @memberof AccountDto
     */
    updatedAt: Date;
    /**
     * Last time this user was online
     * @type {Date}
     * @memberof AccountDto
     */
    lastOnline: Date;
}

/**
 * Check if a given object implements the AccountDto interface.
 */
export function instanceOfAccountDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "emailVerified" in value;
    isInstance = isInstance && "acceptedPrivacyPolicyVersion" in value;
    isInstance = isInstance && "acceptedTermsOfServiceVersion" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "statusText" in value;
    isInstance = isInstance && "friendUserIds" in value;
    isInstance = isInstance && "ssoConnections" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "lastOnline" in value;

    return isInstance;
}

export function AccountDtoFromJSON(json: any): AccountDto {
    return AccountDtoFromJSONTyped(json, false);
}

export function AccountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'username': json['username'],
        'email': json['email'],
        'emailVerified': json['emailVerified'],
        'acceptedPrivacyPolicyVersion': json['acceptedPrivacyPolicyVersion'],
        'acceptedTermsOfServiceVersion': json['acceptedTermsOfServiceVersion'],
        'avatarUrl': !exists(json, 'avatarUrl') ? undefined : json['avatarUrl'],
        'bannerUrl': !exists(json, 'bannerUrl') ? undefined : json['bannerUrl'],
        'status': UserStatusFromJSON(json['status']),
        'statusText': json['statusText'],
        'friendUserIds': json['friendUserIds'],
        'ssoConnections': json['ssoConnections'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'lastOnline': (new Date(json['lastOnline'])),
    };
}

export function AccountDtoToJSON(value?: AccountDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'username': value.username,
        'email': value.email,
        'emailVerified': value.emailVerified,
        'acceptedPrivacyPolicyVersion': value.acceptedPrivacyPolicyVersion,
        'acceptedTermsOfServiceVersion': value.acceptedTermsOfServiceVersion,
        'avatarUrl': value.avatarUrl,
        'bannerUrl': value.bannerUrl,
        'status': UserStatusToJSON(value.status),
        'statusText': value.statusText,
        'friendUserIds': value.friendUserIds,
        'ssoConnections': value.ssoConnections,
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
        'lastOnline': (value.lastOnline.toISOString()),
    };
}

