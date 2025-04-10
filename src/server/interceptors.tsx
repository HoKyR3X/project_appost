import axios from 'axios';
import { getErrorFields } from '../functions/index';
import { isArray, isObject } from 'lodash';

const env = import.meta.env;

const responseFieldsError = {
    email: {
        ['HAS_ALREADY_BEEN_TAKEN']: 'REGISTER.ERRORS.EMAIL_ALREADY_TAKEN'
    }
}

type AxiosBaseRequest = {
  resourcePath: string;
  resourceId?: string | number;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: {[key: string]: any};
}

const axiosHttpHandler = axios.create({
    baseURL: env.APP_GOREST_BASE_URL,
})

axiosHttpHandler.interceptors.request.use(
  (config) => {
    const token = env.APP_GOREST_ACCESS_TOKEN; // Not really mandatory, the token don't change with the logged user

    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  }
);

axiosHttpHandler.interceptors.response.use(
  (response) => {
    return isObject(response?.data) || isArray(response?.data) || response?.status === 204
      ? response 
      : Promise.reject({});
  },
  (err) => { // Handling response for form errors
      const data = err?.response?.data;
      const hasFieldError = err?.response?.status === 422 && data?.some((error: any) => !!error.field);
      const errorFields: any[] = hasFieldError ? getErrorFields(data, responseFieldsError) : [];

      return Promise.reject(errorFields.length ? errorFields : []);
  }
);

export const axiosBaseRequest = <T, >({resourcePath, resourceId, method, data}: AxiosBaseRequest) => {
    const url = `${env.APP_GOREST_BASE_PATH}/${resourcePath}${resourceId ? '/' + resourceId : ''}`;

    return axiosHttpHandler.request<T>({
        url,
        method,
        params: method === 'GET' && data,
        data: method !== 'GET' && data
    })
}