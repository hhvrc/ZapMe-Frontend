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
 * Message sent to server to create a new account
 * @export
 * @interface CreateAccount
 */
export interface CreateAccount {
    /**
     * 
     * @type {string}
     * @memberof CreateAccount
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAccount
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAccount
     */
    email: string;
    /**
     * 
     * @type {number}
     * @memberof CreateAccount
     */
    acceptedPrivacyPolicyVersion: number;
    /**
     * 
     * @type {number}
     * @memberof CreateAccount
     */
    acceptedTermsOfServiceVersion: number;
    /**
     * Response from cloudflare turnstile request
     * @type {string}
     * @memberof CreateAccount
     */
    turnstileResponse: string;
    /**
     * SSO token from OAuth flow, this is optional and only used when creating an account from the OAuth flow
     * @type {string}
     * @memberof CreateAccount
     */
    ssoToken?: string | null;
}

/**
 * Check if a given object implements the CreateAccount interface.
 */
export function instanceOfCreateAccount(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "acceptedPrivacyPolicyVersion" in value;
    isInstance = isInstance && "acceptedTermsOfServiceVersion" in value;
    isInstance = isInstance && "turnstileResponse" in value;

    return isInstance;
}

export function CreateAccountFromJSON(json: any): CreateAccount {
    return CreateAccountFromJSONTyped(json, false);
}

export function CreateAccountFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAccount {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
        'email': json['email'],
        'acceptedPrivacyPolicyVersion': json['acceptedPrivacyPolicyVersion'],
        'acceptedTermsOfServiceVersion': json['acceptedTermsOfServiceVersion'],
        'turnstileResponse': json['turnstileResponse'],
        'ssoToken': !exists(json, 'ssoToken') ? undefined : json['ssoToken'],
    };
}

export function CreateAccountToJSON(value?: CreateAccount | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
        'email': value.email,
        'acceptedPrivacyPolicyVersion': value.acceptedPrivacyPolicyVersion,
        'acceptedTermsOfServiceVersion': value.acceptedTermsOfServiceVersion,
        'turnstileResponse': value.turnstileResponse,
        'ssoToken': value.ssoToken,
    };
}

