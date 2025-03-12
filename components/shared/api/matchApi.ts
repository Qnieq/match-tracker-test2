import axios from 'axios';
import axiosRetry from 'axios-retry';
import type { AxiosError } from 'axios';
import { Match } from '../../../types/match.types';

const apiClient = axios.create({
    baseURL: 'https://app.ftoyd.com/fronttemp-service',
    timeout: 5000,
});

interface RetryOptions {
    retries: number;
    retryDelay: (retryCount: number) => number;
    retryCondition: (error: AxiosError) => boolean;
}

axiosRetry(apiClient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,

    retryCondition: (error: AxiosError): boolean => {
        return (
            !!axiosRetry.isNetworkOrIdempotentRequestError(error) ||
            (error.response ? error.response.status >= 500 : false)
        );
    },
} as RetryOptions);

export interface SuccessfulResponse {
    ok: boolean;
    data: {
        matches: Match[];
    };
}

export const fetchMatchesAPI = async (): Promise<Match[]> => {
    try {
        const response = await apiClient.get<SuccessfulResponse>('/fronttemp');
        return response.data.data.matches;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {

                switch (error.response.status) {
                    case 404:
                        throw new Error('Resource not found (404)');
                    case 500:
                        throw new Error('Internal server error (500)');
                    default:
                        throw new Error(`Unexpected error: ${error.response.statusText}`);
                }
            } else if (error.request) {
                throw new Error('Network error - no response received');
            } else {
                throw new Error(`Axios error: ${error.message}`);
            }
        } else if (error instanceof Error) {
            throw new Error(`Error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
