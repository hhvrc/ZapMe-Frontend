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
export enum RfProtocol {
    proprietary = 'proprietary',
    ble = 'ble',
    wiFi = 'wiFi',
    zigBee = 'zigBee'
}


export function RfProtocolFromJSON(json: any): RfProtocol {
    return RfProtocolFromJSONTyped(json, false);
}

export function RfProtocolFromJSONTyped(json: any, ignoreDiscriminator: boolean): RfProtocol {
    return json as RfProtocol;
}

export function RfProtocolToJSON(value?: RfProtocol | null): any {
    return value as any;
}

