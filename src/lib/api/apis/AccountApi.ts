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
  AccountDto,
  AccountOAuthAdd,
  Create,
  ErrorDetails,
  RecoveryConfirm,
  RecoveryRequest,
  UpdateEmail,
  UpdatePassword,
  UpdateUserName,
} from '../models';
import {
    AccountDtoFromJSON,
    AccountDtoToJSON,
    AccountOAuthAddFromJSON,
    AccountOAuthAddToJSON,
    CreateFromJSON,
    CreateToJSON,
    ErrorDetailsFromJSON,
    ErrorDetailsToJSON,
    RecoveryConfirmFromJSON,
    RecoveryConfirmToJSON,
    RecoveryRequestFromJSON,
    RecoveryRequestToJSON,
    UpdateEmailFromJSON,
    UpdateEmailToJSON,
    UpdatePasswordFromJSON,
    UpdatePasswordToJSON,
    UpdateUserNameFromJSON,
    UpdateUserNameToJSON,
} from '../models';

export interface AccountRecoveryConfirmRequest {
    recoveryConfirm?: RecoveryConfirm;
}

export interface AccountRecoveryRequestRequest {
    recoveryRequest?: RecoveryRequest;
}

export interface AddOAuthProviderRequest {
    providerName: string;
    accountOAuthAdd?: AccountOAuthAdd;
}

export interface CreateAccountRequest {
    create?: Create;
}

export interface DeleteAccountRequest {
    password?: string;
    reason?: string;
}

export interface RemoveOAuthProviderRequest {
    providerName: string;
}

export interface UpdateEmailRequest {
    updateEmail?: UpdateEmail;
}

export interface UpdatePasswordRequest {
    updatePassword?: UpdatePassword;
}

export interface UpdateProfilePictureRequest {
    body: Blob;
}

export interface UpdateUserNameRequest {
    updateUserName?: UpdateUserName;
}

/**
 * AccountApi - interface
 * 
 * @export
 * @interface AccountApiInterface
 */
export interface AccountApiInterface {
    /**
     * 
     * @summary Complete the password reset request using the token that was received in the users email
     * @param {RecoveryConfirm} [recoveryConfirm] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    accountRecoveryConfirmRaw(requestParameters: AccountRecoveryConfirmRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Complete the password reset request using the token that was received in the users email
     */
    accountRecoveryConfirm(requestParameters: AccountRecoveryConfirmRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Request password recovery of a account, a recovery email will be sent to the user that makes a call to the /recovery-confirm endpoint
     * @param {RecoveryRequest} [recoveryRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    accountRecoveryRequestRaw(requestParameters: AccountRecoveryRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Request password recovery of a account, a recovery email will be sent to the user that makes a call to the /recovery-confirm endpoint
     */
    accountRecoveryRequest(requestParameters: AccountRecoveryRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Add a oauth connection to account
     * @param {string} providerName 
     * @param {AccountOAuthAdd} [accountOAuthAdd] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    addOAuthProviderRaw(requestParameters: AddOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Add a oauth connection to account
     */
    addOAuthProvider(requestParameters: AddOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Create a new account
     * @param {Create} [create] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    createAccountRaw(requestParameters: CreateAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Create a new account
     */
    createAccount(requestParameters: CreateAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Delete currently logged in account
     * @param {string} [password] 
     * @param {string} [reason] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    deleteAccountRaw(requestParameters: DeleteAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Delete currently logged in account
     */
    deleteAccount(requestParameters: DeleteAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    getAccountRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>>;

    /**
     * 
     */
    getAccount(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto>;

    /**
     * 
     * @summary Remove a oauth connection from account
     * @param {string} providerName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    removeOAuthProviderRaw(requestParameters: RemoveOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Remove a oauth connection from account
     */
    removeOAuthProvider(requestParameters: RemoveOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Updates the account email
     * @param {UpdateEmail} [updateEmail] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    updateEmailRaw(requestParameters: UpdateEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>>;

    /**
     * Updates the account email
     */
    updateEmail(requestParameters: UpdateEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto>;

    /**
     * 
     * @summary Updates the account password
     * @param {UpdatePassword} [updatePassword] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    updatePasswordRaw(requestParameters: UpdatePasswordRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>>;

    /**
     * Updates the account password
     */
    updatePassword(requestParameters: UpdatePasswordRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto>;

    /**
     * 
     * @summary Updates the account username
     * @param {Blob} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    updateProfilePictureRaw(requestParameters: UpdateProfilePictureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Updates the account username
     */
    updateProfilePicture(requestParameters: UpdateProfilePictureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Updates the account username
     * @param {UpdateUserName} [updateUserName] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountApiInterface
     */
    updateUserNameRaw(requestParameters: UpdateUserNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>>;

    /**
     * Updates the account username
     */
    updateUserName(requestParameters: UpdateUserNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto>;

}

/**
 * 
 */
export class AccountApi extends runtime.BaseAPI implements AccountApiInterface {

    /**
     * Complete the password reset request using the token that was received in the users email
     */
    async accountRecoveryConfirmRaw(requestParameters: AccountRecoveryConfirmRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account/recover-confirm`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RecoveryConfirmToJSON(requestParameters.recoveryConfirm),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Complete the password reset request using the token that was received in the users email
     */
    async accountRecoveryConfirm(requestParameters: AccountRecoveryConfirmRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.accountRecoveryConfirmRaw(requestParameters, initOverrides);
    }

    /**
     * Request password recovery of a account, a recovery email will be sent to the user that makes a call to the /recovery-confirm endpoint
     */
    async accountRecoveryRequestRaw(requestParameters: AccountRecoveryRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account/recover`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RecoveryRequestToJSON(requestParameters.recoveryRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Request password recovery of a account, a recovery email will be sent to the user that makes a call to the /recovery-confirm endpoint
     */
    async accountRecoveryRequest(requestParameters: AccountRecoveryRequestRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.accountRecoveryRequestRaw(requestParameters, initOverrides);
    }

    /**
     * Add a oauth connection to account
     */
    async addOAuthProviderRaw(requestParameters: AddOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.providerName === null || requestParameters.providerName === undefined) {
            throw new runtime.RequiredError('providerName','Required parameter requestParameters.providerName was null or undefined when calling addOAuthProvider.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account/oauth/{providerName}`.replace(`{${"providerName"}}`, encodeURIComponent(String(requestParameters.providerName))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AccountOAuthAddToJSON(requestParameters.accountOAuthAdd),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add a oauth connection to account
     */
    async addOAuthProvider(requestParameters: AddOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.addOAuthProviderRaw(requestParameters, initOverrides);
    }

    /**
     * Create a new account
     */
    async createAccountRaw(requestParameters: CreateAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateToJSON(requestParameters.create),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a new account
     */
    async createAccount(requestParameters: CreateAccountRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createAccountRaw(requestParameters, initOverrides);
    }

    /**
     * Delete currently logged in account
     */
    async deleteAccountRaw(requestParameters: DeleteAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.password !== undefined && requestParameters.password !== null) {
            headerParameters['password'] = String(requestParameters.password);
        }

        if (requestParameters.reason !== undefined && requestParameters.reason !== null) {
            headerParameters['reason'] = String(requestParameters.reason);
        }

        const response = await this.request({
            path: `/api/v1/Account`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete currently logged in account
     */
    async deleteAccount(requestParameters: DeleteAccountRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteAccountRaw(requestParameters, initOverrides);
    }

    /**
     * 
     */
    async getAccountRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/Account`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountDtoFromJSON(jsonValue));
    }

    /**
     * 
     */
    async getAccount(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto> {
        const response = await this.getAccountRaw(initOverrides);
        return await response.value();
    }

    /**
     * Remove a oauth connection from account
     */
    async removeOAuthProviderRaw(requestParameters: RemoveOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.providerName === null || requestParameters.providerName === undefined) {
            throw new runtime.RequiredError('providerName','Required parameter requestParameters.providerName was null or undefined when calling removeOAuthProvider.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/Account/oauth/{providerName}`.replace(`{${"providerName"}}`, encodeURIComponent(String(requestParameters.providerName))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a oauth connection from account
     */
    async removeOAuthProvider(requestParameters: RemoveOAuthProviderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeOAuthProviderRaw(requestParameters, initOverrides);
    }

    /**
     * Updates the account email
     */
    async updateEmailRaw(requestParameters: UpdateEmailRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account/email`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateEmailToJSON(requestParameters.updateEmail),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountDtoFromJSON(jsonValue));
    }

    /**
     * Updates the account email
     */
    async updateEmail(requestParameters: UpdateEmailRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto> {
        const response = await this.updateEmailRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Updates the account password
     */
    async updatePasswordRaw(requestParameters: UpdatePasswordRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account/password`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdatePasswordToJSON(requestParameters.updatePassword),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountDtoFromJSON(jsonValue));
    }

    /**
     * Updates the account password
     */
    async updatePassword(requestParameters: UpdatePasswordRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto> {
        const response = await this.updatePasswordRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Updates the account username
     */
    async updateProfilePictureRaw(requestParameters: UpdateProfilePictureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateProfilePicture.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'image/png';

        const response = await this.request({
            path: `/api/v1/Account/pfp`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates the account username
     */
    async updateProfilePicture(requestParameters: UpdateProfilePictureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.updateProfilePictureRaw(requestParameters, initOverrides);
    }

    /**
     * Updates the account username
     */
    async updateUserNameRaw(requestParameters: UpdateUserNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/Account/username`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserNameToJSON(requestParameters.updateUserName),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountDtoFromJSON(jsonValue));
    }

    /**
     * Updates the account username
     */
    async updateUserName(requestParameters: UpdateUserNameRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountDto> {
        const response = await this.updateUserNameRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
