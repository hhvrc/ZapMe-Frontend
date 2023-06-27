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
import type { UserRelationType } from './UserRelationType';
import {
    UserRelationTypeFromJSON,
    UserRelationTypeFromJSONTyped,
    UserRelationTypeToJSON,
} from './UserRelationType';
import type { UserStatus } from './UserStatus';
import {
    UserStatusFromJSON,
    UserStatusFromJSONTyped,
    UserStatusToJSON,
} from './UserStatus';

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
    avatarUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    bannerUrl?: string | null;
    /**
     * 
     * @type {UserStatus}
     * @memberof UserDto
     */
    status: UserStatus;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    statusText: string;
    /**
     * 
     * @type {UserRelationType}
     * @memberof UserDto
     */
    relationType: UserRelationType;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    nickName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    notes?: string | null;
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
    /**
     * The time this user was friended at
     * @type {Date}
     * @memberof UserDto
     */
    friendedAt?: Date | null;
}

/**
 * Check if a given object implements the UserDto interface.
 */
export function instanceOfUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "statusText" in value;
    isInstance = isInstance && "relationType" in value;
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
        'avatarUrl': !exists(json, 'avatarUrl') ? undefined : json['avatarUrl'],
        'bannerUrl': !exists(json, 'bannerUrl') ? undefined : json['bannerUrl'],
        'status': UserStatusFromJSON(json['status']),
        'statusText': json['statusText'],
        'relationType': UserRelationTypeFromJSON(json['relationType']),
        'nickName': !exists(json, 'nickName') ? undefined : json['nickName'],
        'notes': !exists(json, 'notes') ? undefined : json['notes'],
        'createdAt': (new Date(json['createdAt'])),
        'lastSeenAt': (new Date(json['lastSeenAt'])),
        'friendedAt': !exists(json, 'friendedAt') ? undefined : (json['friendedAt'] === null ? null : new Date(json['friendedAt'])),
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
        'avatarUrl': value.avatarUrl,
        'bannerUrl': value.bannerUrl,
        'status': UserStatusToJSON(value.status),
        'statusText': value.statusText,
        'relationType': UserRelationTypeToJSON(value.relationType),
        'nickName': value.nickName,
        'notes': value.notes,
        'createdAt': (value.createdAt.toISOString()),
        'lastSeenAt': (value.lastSeenAt.toISOString()),
        'friendedAt': value.friendedAt === undefined ? undefined : (value.friendedAt === null ? null : value.friendedAt.toISOString()),
    };
}

