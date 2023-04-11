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
import type { SeverityLevel } from './SeverityLevel';
import {
    SeverityLevelFromJSON,
    SeverityLevelFromJSONTyped,
    SeverityLevelToJSON,
} from './SeverityLevel';

/**
 * System notification to be displayed to the user, do not confuse with user notifications
 * This is a hint and clients can choose to ignore it or implement notifications to be independent of this
 * @export
 * @interface UserNotification
 */
export interface UserNotification {
    /**
     * 
     * @type {SeverityLevel}
     * @memberof UserNotification
     */
    severity?: SeverityLevel;
    /**
     * Message title to display to the user
     * @type {string}
     * @memberof UserNotification
     */
    title?: string;
    /**
     * User friendly message about this notification
     * @type {string}
     * @memberof UserNotification
     */
    message?: string | null;
}

/**
 * Check if a given object implements the UserNotification interface.
 */
export function instanceOfUserNotification(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserNotificationFromJSON(json: any): UserNotification {
    return UserNotificationFromJSONTyped(json, false);
}

export function UserNotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserNotification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'severity': !exists(json, 'severity') ? undefined : SeverityLevelFromJSON(json['severity']),
        'title': !exists(json, 'title') ? undefined : json['title'],
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function UserNotificationToJSON(value?: UserNotification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'severity': SeverityLevelToJSON(value.severity),
        'title': value.title,
        'message': value.message,
    };
}
