import { AxiosError, AxiosResponse } from 'axios';
import axios from '../../axios/axiosInterceptor';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const prepareQueryParams = (urlQueryParam: {
  [key: string]: string | number | null;
}) => {
  let queryParams = '';
  const keyValue = Object.entries(urlQueryParam);
  let indx: number = 0;
  for (const [key, value] of keyValue) {
    queryParams += `${key}=${value}`;
    if (keyValue.length > 1 && indx < keyValue.length - 1) {
      queryParams += '&';
    }
    indx++;
  }
  return queryParams;
};

const preparePathParameters = (params: Array<string | number> = []) => {
  if (params.length) {
    return `/${params.join('/')}`;
  } else {
    return '';
  }
};

const prepareServerResponse = (error: AxiosError) => {
  if (!error?.response) {
    return {
      data: {
        success: false,
        data: [],
        message: 'failed to get server response',
      },
    };
  }
  return { data: error.response.data };
};

export const postRequest = async (path: string, data: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/${path}`,
      data,
    );
    return { data: response.data };
  } catch (error: unknown) {
    return prepareServerResponse(error as AxiosError);
  }
};

export const getRequest = async (
  path: string,
  urlQueryParam: { [key: string]: string | number | null } = {},
  ...pathParameters: Array<string>
) => {
  try {
    let queryParams = prepareQueryParams(urlQueryParam);
    if (queryParams) {
      queryParams = `?${queryParams}`;
    }
    const preparedPathParameters = preparePathParameters(pathParameters);
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/${path}${preparedPathParameters}${queryParams}`,
    );
    return { data: response.data };
  } catch (error: unknown) {
    return prepareServerResponse(error as AxiosError);
  }
};

export const patchRequest = async (
  path: string,
  data: any,
  urlQueryParam: { [key: string | number]: string | number } = {},
  ...pathParameters: Array<string | number>
) => {
  try {
    let queryParams = prepareQueryParams(urlQueryParam);
    if (queryParams) {
      queryParams = `?${queryParams}`;
    }
    const preparedPathParameters = preparePathParameters(pathParameters);
    const response: AxiosResponse = await axios.patch(
      `${BASE_URL}/${path}${preparedPathParameters}${queryParams}`,
      data,
    );
    return { data: response.data };
  } catch (error) {
    return prepareServerResponse(error as AxiosError);
  }
};

export const deleteRequest = async (
  path: string,
  urlQueryParam: { [key: string | number]: string } = {},
  ...pathParameters: Array<string | number>
) => {
  try {
    let queryParams = prepareQueryParams(urlQueryParam);
    if (queryParams) {
      queryParams = `?${queryParams}`;
    }

    const preparedPathParameters = preparePathParameters(pathParameters);

    const response: AxiosResponse = await axios.delete(
      `${BASE_URL}/${path}${preparedPathParameters}${queryParams}`,
    );
    return { data: response.data };
  } catch (error) {
    return prepareServerResponse(error as AxiosError);
  }
};

export const putRequest = async (
  path: string,
  urlQueryParam: { [key: string | number]: string } = {},
  ...pathParameters: Array<string | number>
) => {
  try {
    let queryParams = prepareQueryParams(urlQueryParam);
    if (queryParams) {
      queryParams = `?${queryParams}`;
    }
    const preparedPathParameters = preparePathParameters(pathParameters);
    const response: AxiosResponse = await axios.put(
      `${BASE_URL}/${path}${preparedPathParameters}${queryParams}`,
    );
    return { data: response.data };
  } catch (error) {
    return prepareServerResponse(error as AxiosError);
  }
};
