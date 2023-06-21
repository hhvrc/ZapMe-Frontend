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


import * as runtime from '../runtime';
import type {
  ApiConfig,
  ErrorDetails,
} from '../models';
import {
    ApiConfigFromJSON,
    ApiConfigToJSON,
    ErrorDetailsFromJSON,
    ErrorDetailsToJSON,
} from '../models';

/**
 * ConfigApi - interface
 * 
 * @export
 * @interface ConfigApiInterface
 */
export interface ConfigApiInterface {
    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConfigApiInterface
     */
    getConfigRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiConfig>>;

    /**
     * 
     */
    getConfig(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiConfig>;

}

/**
 * 
 */
export class ConfigApi extends runtime.BaseAPI implements ConfigApiInterface {

    /**
     * 
     */
    async getConfigRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiConfig>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/config`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiConfigFromJSON(jsonValue));
    }

    /**
     * 
     */
    async getConfig(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiConfig> {
        const response = await this.getConfigRaw(initOverrides);
        return await response.value();
    }

}
