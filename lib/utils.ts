import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)

  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)

  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const handleError = (error: unknown) => {
  console.error('Error:', error);  // Logs the error for debugging purposes

  // Check if it's an error object and extract message, otherwise stringify
  const errorMessage = 
    (error instanceof Error && error.message) || 
    (typeof error === 'string' ? error : JSON.stringify(error));

  throw new Error(errorMessage);
}

export function formatEventDates(startDateTime: Date | string, endDateTime: Date | string) {
  try {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid date format');
    }

    const options: Intl.DateTimeFormatOptions = { 
      month: "long" as const, 
      day: "numeric" as const 
    };

    const startDateFormatted = new Intl.DateTimeFormat("en-US", options).format(start);
    const endDateFormatted = new Intl.DateTimeFormat("en-US", options).format(end);

    const sameMonth = start.getMonth() === end.getMonth();
    const year = start.getFullYear();

    return sameMonth
      ? `${startDateFormatted.split(" ")[0]} ${startDateFormatted.split(" ")[1]} - ${endDateFormatted.split(" ")[1]}, ${year}`
      : `${startDateFormatted} - ${endDateFormatted}, ${year}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date range';
  }
}

export function  hasEventFinished(endDateTime:Date){
  return new Date(endDateTime)< new Date();
  }

  