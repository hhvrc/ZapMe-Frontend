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
 * @interface OAuthTicket
 */
export interface OAuthTicket {
    /**
     * 
     * @type {string}
     * @memberof OAuthTicket
     */
    ticket: string;
    /**
     * 
     * @type {Date}
     * @memberof OAuthTicket
     */
    expiresAtUtc: Date;
}

/**
 * Check if a given object implements the OAuthTicket interface.
 */
export function instanceOfOAuthTicket(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "ticket" in value;
    isInstance = isInstance && "expiresAtUtc" in value;

    return isInstance;
}

export function OAuthTicketFromJSON(json: any): OAuthTicket {
    return OAuthTicketFromJSONTyped(json, false);
}

export function OAuthTicketFromJSONTyped(json: any, ignoreDiscriminator: boolean): OAuthTicket {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ticket': json['ticket'],
        'expiresAtUtc': (new Date(json['expiresAtUtc'])),
    };
}

export function OAuthTicketToJSON(value?: OAuthTicket | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ticket': value.ticket,
        'expiresAtUtc': (value.expiresAtUtc.toISOString()),
    };
}

