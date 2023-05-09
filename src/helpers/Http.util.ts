import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export default class Http {
  makePostRequest = (
    url: string,
    data: object,
    headers?: object,
    timeout?: number,
  ) => {
    return this.getAxiosInstance(headers, timeout).post(url, data);
  };

  makeGetRequest = (
    url: string,
    headers?: object,
    timeout?: number,
  ): Promise<AxiosResponse> => {
    return this.getAxiosInstance(headers, timeout).get(url);
  };

  makePatchRequest = (
    url: string,
    data: object,
    headers?: object,
    timeout?: number,
  ) => {
    return this.getAxiosInstance(headers, timeout).patch(url, data);
  };

  /**
   * Single axios instance for all our calls.
   * @param headers
   * @returns
   */
  private getAxiosInstance = (
    headers?: any,
    timeout = 300000,
  ): AxiosInstance => {
    return axios.create({
      timeout,
      headers,
    });
  };
}
