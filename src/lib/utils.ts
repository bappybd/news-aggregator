import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const cache = new Map();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchWithRetryAndCache = async (
  url: string,
  config: AxiosRequestConfig | undefined = undefined,
  retries: number = 3
): Promise<AxiosResponse> => {
  const cacheKey = btoa(`${url}${JSON.stringify(config)}`);
  if (cache.has(cacheKey)) {
    return Promise.resolve(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(url, config);
    cache.set(cacheKey, response);
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying (${retries}) for ${url}...`);
      return await fetchWithRetryAndCache(url, config, retries - 1);
    } else {
      throw error;
    }
  }
};
