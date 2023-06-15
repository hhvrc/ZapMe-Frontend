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
  ErrorDetails,
  FriendRequestList,
  ReportUserRequest,
  UserDto,
} from '../models';
import {
    ErrorDetailsFromJSON,
    ErrorDetailsToJSON,
    FriendRequestListFromJSON,
    FriendRequestListToJSON,
    ReportUserRequestFromJSON,
    ReportUserRequestToJSON,
    UserDtoFromJSON,
    UserDtoToJSON,
} from '../models';

export interface AcceptFriendRequestRequest {
    userId: string;
}

export interface BlockUserRequest {
    userId: string;
}

export interface DenyFriendRequestRequest {
    userId: string;
}

export interface GetUserRequest {
    userId: string;
}

export interface LookUpUserRequest {
    userName: string;
}

export interface ReportUserOperationRequest {
    reportUserRequest?: ReportUserRequest;
}

export interface SendFriendRequestRequest {
    userId: string;
}

/**
 * UserApi - interface
 * 
 * @export
 * @interface UserApiInterface
 */
export interface UserApiInterface {
    /**
     * 
     * @summary Accept incoming friend request
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    acceptFriendRequestRaw(requestParameters: AcceptFriendRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     * Accept incoming friend request
     */
    acceptFriendRequest(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto>;

    /**
     * 
     * @summary Block a user
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    blockUserRaw(requestParameters: BlockUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Block a user
     */
    blockUser(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Delete outgoing/Reject incoming friend request
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    denyFriendRequestRaw(requestParameters: DenyFriendRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     * Delete outgoing/Reject incoming friend request
     */
    denyFriendRequest(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto>;

    /**
     * 
     * @summary Get user
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     * Get user
     */
    getUser(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto>;

    /**
     * 
     * @summary List all incoming and outgoing friend requests
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    listFriendRequestsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FriendRequestList>>;

    /**
     * List all incoming and outgoing friend requests
     */
    listFriendRequests(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FriendRequestList>;

    /**
     * 
     * @summary Look up user by name
     * @param {string} userName 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    lookUpUserRaw(requestParameters: LookUpUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>>;

    /**
     * Look up user by name
     */
    lookUpUser(userName: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto>;

    /**
     * 
     * @summary Report a user
     * @param {ReportUserRequest} [reportUserRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    reportUserRaw(requestParameters: ReportUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Report a user
     */
    reportUser(reportUserRequest?: ReportUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Send friend request
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApiInterface
     */
    sendFriendRequestRaw(requestParameters: SendFriendRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Send friend request
     */
    sendFriendRequest(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI implements UserApiInterface {

    /**
     * Accept incoming friend request
     */
    async acceptFriendRequestRaw(requestParameters: AcceptFriendRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling acceptFriendRequest.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/i/{userId}/friendrequest`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Accept incoming friend request
     */
    async acceptFriendRequest(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.acceptFriendRequestRaw({ userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * Block a user
     */
    async blockUserRaw(requestParameters: BlockUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling blockUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/block`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Block a user
     */
    async blockUser(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.blockUserRaw({ userId: userId }, initOverrides);
    }

    /**
     * Delete outgoing/Reject incoming friend request
     */
    async denyFriendRequestRaw(requestParameters: DenyFriendRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling denyFriendRequest.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/i/{userId}/friendrequest`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Delete outgoing/Reject incoming friend request
     */
    async denyFriendRequest(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.denyFriendRequestRaw({ userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * Get user
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/i/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Get user
     */
    async getUser(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.getUserRaw({ userId: userId }, initOverrides);
        return await response.value();
    }

    /**
     * List all incoming and outgoing friend requests
     */
    async listFriendRequestsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FriendRequestList>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/friendrequests`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FriendRequestListFromJSON(jsonValue));
    }

    /**
     * List all incoming and outgoing friend requests
     */
    async listFriendRequests(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FriendRequestList> {
        const response = await this.listFriendRequestsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Look up user by name
     */
    async lookUpUserRaw(requestParameters: LookUpUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userName === null || requestParameters.userName === undefined) {
            throw new runtime.RequiredError('userName','Required parameter requestParameters.userName was null or undefined when calling lookUpUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/u/{userName}`.replace(`{${"userName"}}`, encodeURIComponent(String(requestParameters.userName))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Look up user by name
     */
    async lookUpUser(userName: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.lookUpUserRaw({ userName: userName }, initOverrides);
        return await response.value();
    }

    /**
     * Report a user
     */
    async reportUserRaw(requestParameters: ReportUserOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/report`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReportUserRequestToJSON(requestParameters.reportUserRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Report a user
     */
    async reportUser(reportUserRequest?: ReportUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.reportUserRaw({ reportUserRequest: reportUserRequest }, initOverrides);
    }

    /**
     * Send friend request
     */
    async sendFriendRequestRaw(requestParameters: SendFriendRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling sendFriendRequest.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/v1/user/i/{userId}/friendrequest`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Send friend request
     */
    async sendFriendRequest(userId: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.sendFriendRequestRaw({ userId: userId }, initOverrides);
    }

}
