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
import type { ApiDisabledFeatures } from './ApiDisabledFeatures';
import {
    ApiDisabledFeaturesFromJSON,
    ApiDisabledFeaturesFromJSONTyped,
    ApiDisabledFeaturesToJSON,
} from './ApiDisabledFeatures';
import type { AuthenticationConfig } from './AuthenticationConfig';
import {
    AuthenticationConfigFromJSON,
    AuthenticationConfigFromJSONTyped,
    AuthenticationConfigToJSON,
} from './AuthenticationConfig';

/**
 * 
 * @export
 * @interface ApiConfig
 */
export interface ApiConfig {
    /**
     * The current version of the API
     * @type {string}
     * @memberof ApiConfig
     */
    version?: string;
    /**
     * The current Terms of Service version, if the user has not accepted this version, they will be prompted to accept it
     * @type {number}
     * @memberof ApiConfig
     */
    tosVersion?: number;
    /**
     * The DSN for Sentry, used for error reporting
     * If this is null, Sentry reporting is disabled
     * @type {string}
     * @memberof ApiConfig
     */
    sentryDsn?: string | null;
    /**
     * Trace sample rate for Sentry, used for performance monitoring
     * @type {number}
     * @memberof ApiConfig
     */
    sentryTraceSampleRate?: number;
    /**
     * 
     * @type {AuthenticationConfig}
     * @memberof ApiConfig
     */
    authentication?: AuthenticationConfig;
    /**
     * 
     * @type {ApiDisabledFeatures}
     * @memberof ApiConfig
     */
    disabledFeatures?: ApiDisabledFeatures;
}

/**
 * Check if a given object implements the ApiConfig interface.
 */
export function instanceOfApiConfig(value: object): boolean {
    let isInstance = true;

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
        
        'version': !exists(json, 'version') ? undefined : json['version'],
        'tosVersion': !exists(json, 'tos_version') ? undefined : json['tos_version'],
        'sentryDsn': !exists(json, 'sentry_dsn') ? undefined : json['sentry_dsn'],
        'sentryTraceSampleRate': !exists(json, 'sentry_trace_sample_rate') ? undefined : json['sentry_trace_sample_rate'],
        'authentication': !exists(json, 'authentication') ? undefined : AuthenticationConfigFromJSON(json['authentication']),
        'disabledFeatures': !exists(json, 'disabled_features') ? undefined : ApiDisabledFeaturesFromJSON(json['disabled_features']),
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
        
        'version': value.version,
        'tos_version': value.tosVersion,
        'sentry_dsn': value.sentryDsn,
        'sentry_trace_sample_rate': value.sentryTraceSampleRate,
        'authentication': AuthenticationConfigToJSON(value.authentication),
        'disabled_features': ApiDisabledFeaturesToJSON(value.disabledFeatures),
    };
}

