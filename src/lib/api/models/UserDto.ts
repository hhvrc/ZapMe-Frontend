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
import type { UserPresence } from './UserPresence';
import {
    UserPresenceFromJSON,
    UserPresenceFromJSONTyped,
    UserPresenceToJSON,
} from './UserPresence';

/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    profilePictureUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    profileBannerUrl?: string | null;
    /**
     * 
     * @type {UserPresence}
     * @memberof UserDto
     */
    presence: UserPresence;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    statusMessage: string;
    /**
     * Date this user was created at
     * @type {Date}
     * @memberof UserDto
     */
    createdAt: Date;
    /**
     * Last time this user was seen online
     * @type {Date}
     * @memberof UserDto
     */
    lastSeenAt: Date;
}

/**
 * Check if a given object implements the UserDto interface.
 */
export function instanceOfUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "presence" in value;
    isInstance = isInstance && "statusMessage" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "lastSeenAt" in value;

    return isInstance;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'username': json['username'],
        'profilePictureUrl': !exists(json, 'profilePictureUrl') ? undefined : json['profilePictureUrl'],
        'profileBannerUrl': !exists(json, 'profileBannerUrl') ? undefined : json['profileBannerUrl'],
        'presence': UserPresenceFromJSON(json['presence']),
        'statusMessage': json['statusMessage'],
        'createdAt': (new Date(json['createdAt'])),
        'lastSeenAt': (new Date(json['lastSeenAt'])),
    };
}

export function UserDtoToJSON(value?: UserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'username': value.username,
        'profilePictureUrl': value.profilePictureUrl,
        'profileBannerUrl': value.profileBannerUrl,
        'presence': UserPresenceToJSON(value.presence),
        'statusMessage': value.statusMessage,
        'createdAt': (value.createdAt.toISOString()),
        'lastSeenAt': (value.lastSeenAt.toISOString()),
    };
}

