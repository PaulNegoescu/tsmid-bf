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
import { resources } from "../config";

type Resource = (typeof resources)[number];
type ResourceUrlPart = `/${Resource}`; // /Resource
type SearchObj = {
  search?: Record<string, string>
};

// type MyRecord<Key extends keyof any, Val> = {
//   [Index in Key]: Val
// }

export class ApiHelper<T> {
  private apiUrl: string = import.meta.env.VITE_API_URL;

  constructor(private resource: ResourceUrlPart) {}

  getAll(config: RequestInit & SearchObj): Promise<T[]> {
    return fetch(`${this.apiUrl}${this.resource}`, config).then(this.processResponse)
  }

  getOne(): Promise<T> {

  }

  create() {

  }

  update() {

  }

  remove() {

  }

  private processResponse(res: Response) {
    if(!res.ok) {
      throw new Error('Something didn\'t go right, please try again later!');
    }
    return res.json();
  }
}
