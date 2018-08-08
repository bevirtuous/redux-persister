import greenlet from 'greenlet';

export const jsonStringify = greenlet(data => JSON.stringify(data));
export const jsonParse = greenlet(data => (data ? JSON.parse(data) : {}));
