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
import type { ApiConfigContact } from './ApiConfigContact';
import {
    ApiConfigContactFromJSON,
    ApiConfigContactFromJSONTyped,
    ApiConfigContactToJSON,
} from './ApiConfigContact';
import type { ApiConfigFounderSocials } from './ApiConfigFounderSocials';
import {
    ApiConfigFounderSocialsFromJSON,
    ApiConfigFounderSocialsFromJSONTyped,
    ApiConfigFounderSocialsToJSON,
} from './ApiConfigFounderSocials';
import type { ApiConfigWebRtc } from './ApiConfigWebRtc';
import {
    ApiConfigWebRtcFromJSON,
    ApiConfigWebRtcFromJSONTyped,
    ApiConfigWebRtcToJSON,
} from './ApiConfigWebRtc';

/**
 * 
 * @export
 * @interface ApiConfig
 */
export interface ApiConfig {
    /**
     * Name of the product, e.g. "ZapMe"
     * @type {string}
     * @memberof ApiConfig
     */
    appName: string;
    /**
     * Version of the product, e.g. "1.0.0"
     * @type {string}
     * @memberof ApiConfig
     */
    appVersion: string;
    /**
     * The current Privacy Policy version, if the user has not accepted this version, they will be prompted to accept it
     * @type {number}
     * @memberof ApiConfig
     */
    privacyPolicyVersion: number;
    /**
     * Markdown of the Privacy Policy
     * @type {string}
     * @memberof ApiConfig
     */
    privacyPolicyMarkdown: string;
    /**
     * The current Terms of Service version, if the user has not accepted this version, they will be prompted to accept it
     * @type {number}
     * @memberof ApiConfig
     */
    termsOfServiceVersion: number;
    /**
     * Markdown of the Terms of Service
     * @type {string}
     * @memberof ApiConfig
     */
    termsOfServiceMarkdown: string;
    /**
     * 
     * @type {ApiConfigWebRtc}
     * @memberof ApiConfig
     */
    webRtc: ApiConfigWebRtc;
    /**
     * 
     * @type {ApiConfigContact}
     * @memberof ApiConfig
     */
    contact: ApiConfigContact;
    /**
     * 
     * @type {ApiConfigFounderSocials}
     * @memberof ApiConfig
     */
    founderSocials: ApiConfigFounderSocials;
}

/**
 * Check if a given object implements the ApiConfig interface.
 */
export function instanceOfApiConfig(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appName" in value;
    isInstance = isInstance && "appVersion" in value;
    isInstance = isInstance && "privacyPolicyVersion" in value;
    isInstance = isInstance && "privacyPolicyMarkdown" in value;
    isInstance = isInstance && "termsOfServiceVersion" in value;
    isInstance = isInstance && "termsOfServiceMarkdown" in value;
    isInstance = isInstance && "webRtc" in value;
    isInstance = isInstance && "contact" in value;
    isInstance = isInstance && "founderSocials" in value;

    return isInstance;
}

export function ApiConfigFromJSON(json: any): ApiConfig {
    return ApiConfigFromJSONTyped(json, false);
}

export function ApiConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appName': json['appName'],
        'appVersion': json['appVersion'],
        'privacyPolicyVersion': json['privacyPolicyVersion'],
        'privacyPolicyMarkdown': json['privacyPolicyMarkdown'],
        'termsOfServiceVersion': json['termsOfServiceVersion'],
        'termsOfServiceMarkdown': json['termsOfServiceMarkdown'],
        'webRtc': ApiConfigWebRtcFromJSON(json['webRtc']),
        'contact': ApiConfigContactFromJSON(json['contact']),
        'founderSocials': ApiConfigFounderSocialsFromJSON(json['founderSocials']),
    };
}

export function ApiConfigToJSON(value?: ApiConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'appName': value.appName,
        'appVersion': value.appVersion,
        'privacyPolicyVersion': value.privacyPolicyVersion,
        'privacyPolicyMarkdown': value.privacyPolicyMarkdown,
        'termsOfServiceVersion': value.termsOfServiceVersion,
        'termsOfServiceMarkdown': value.termsOfServiceMarkdown,
        'webRtc': ApiConfigWebRtcToJSON(value.webRtc),
        'contact': ApiConfigContactToJSON(value.contact),
        'founderSocials': ApiConfigFounderSocialsToJSON(value.founderSocials),
    };
}

