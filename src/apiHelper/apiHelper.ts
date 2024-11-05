/*
  resource = 'users' | 'notes';
  // http://dsadasd/users?firstName=Paul

  getAll({orice e valid pentru fetch, plus: search: {camp: valoare} }) // GET /resource
  // returns an array of entities

  getOne(id, {config object compatibil cu fetch})
  // returns an entity (objects)

  create(body, {config object})
  // returns an entity

  update(id, body, cfgObj)
  // returns an entity

  remove(id)
  // returns an empty object
*/
import { resources } from '../config';

type Resource = (typeof resources)[number];
type ResourceUrlPart = `/${Resource}`; // /Resource
type SearchObj = {
  search?: Record<string, string>;
};

// type MyRecord<Key extends keyof any, Val> = {
//   [Index in Key]: Val
// }

type FetchConfig = Omit<RequestInit, 'method' | 'body'>;

export class ApiHelper<T extends object> {
  private apiUrl: string = import.meta.env.VITE_API_URL;
  private contentTypeHeader = {
    'Content-Type': 'application/json',
  };

  constructor(private resource: ResourceUrlPart) {}

  getAll(config?: FetchConfig & SearchObj): Promise<T[]> {
    //http://localhost:3000/users?firstName=Paul&lastName=Negoescu
    let searchUrl = '';
    if(config && 'search' in config) {
      searchUrl = (new URLSearchParams(config.search)).toString();
    }

    return fetch(`${this.apiUrl}${this.resource}${searchUrl && '?' + searchUrl}`, config).then(
      this.processResponse
    );
  }

  getOne(id: number | string, config?: FetchConfig): Promise<T> {
    return fetch(`${this.apiUrl}${this.resource}/${id}`, config).then(this.processResponse);
  }

  create<C extends T>(body: C, config: FetchConfig = {}): Promise<T> {
    const options: RequestInit = structuredClone(config);
    options.method = 'POST';
    options.headers = {
      ...options.headers,
      ...this.contentTypeHeader,
    };
    options.body = JSON.stringify(body);

    return fetch(`${this.apiUrl}${this.resource}`, options).then(this.processResponse);
  }

  update<C extends T>(id: number | string, body: C, config: FetchConfig = {}): Promise<T> {
    const options: RequestInit = config;
    options.method = 'PATCH';
    options.headers = {
      ...options.headers,
      ...this.contentTypeHeader,
    };
    options.body = JSON.stringify(body);

    return fetch(`${this.apiUrl}${this.resource}/${id}`, options).then(this.processResponse);
  }

  remove(id: number | string, config: FetchConfig = {}): Promise<{} | string> {
    const options: RequestInit = config;
    options.method = 'DELETE';

    return fetch(`${this.apiUrl}${this.resource}/${id}`, options).then(this.processResponse);
  }

  private processResponse(res: Response) {
    if (!res.ok) {
      throw new Error("Something didn't go right, please try again later!");
    }
    return res.json();
  }
}
