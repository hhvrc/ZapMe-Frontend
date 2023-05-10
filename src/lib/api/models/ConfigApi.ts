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
import type { ApiConfigDisabledFeatures } from './ApiConfigDisabledFeatures';
import {
    ApiConfigDisabledFeaturesFromJSON,
    ApiConfigDisabledFeaturesFromJSONTyped,
    ApiConfigDisabledFeaturesToJSON,
} from './ApiConfigDisabledFeatures';

/**
 * Api configuration, e.g. version, etc.
 * @export
 * @interface ConfigApi
 */
export interface ConfigApi {
    /**
     * The current Terms of Service version, if the user has not accepted this version, they will be prompted to accept it
     * @type {number}
     * @memberof ConfigApi
     */
    tosVersion: number;
    /**
     * The current Privacy Policy version, if the user has not accepted this version, they will be prompted to accept it
     * @type {number}
     * @memberof ConfigApi
     */
    privacyVersion: number;
    /**
     * 
     * @type {ApiConfigDisabledFeatures}
     * @memberof ConfigApi
     */
    disabledFeatures: ApiConfigDisabledFeatures;
}

/**
 * Check if a given object implements the ConfigApi interface.
 */
export function instanceOfConfigApi(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tosVersion" in value;
    isInstance = isInstance && "privacyVersion" in value;
    isInstance = isInstance && "disabledFeatures" in value;

    return isInstance;
}

export function ConfigApiFromJSON(json: any): ConfigApi {
    return ConfigApiFromJSONTyped(json, false);
}

export function ConfigApiFromJSONTyped(json: any, ignoreDiscriminator: boolean): ConfigApi {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tosVersion': json['tosVersion'],
        'privacyVersion': json['privacyVersion'],
        'disabledFeatures': ApiConfigDisabledFeaturesFromJSON(json['disabledFeatures']),
    };
}

export function ConfigApiToJSON(value?: ConfigApi | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tosVersion': value.tosVersion,
        'privacyVersion': value.privacyVersion,
        'disabledFeatures': ApiConfigDisabledFeaturesToJSON(value.disabledFeatures),
    };
}

