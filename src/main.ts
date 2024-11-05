import { ApiHelper } from "./apiHelper/apiHelper";


type BoxModelProperty = 'margin' | 'padding';
type Direction = 'top' | 'right' | 'bottom' | 'left';
type ValidProperty = `${BoxModelProperty}-${Direction}`;

type SizeUnit = 'rem' | 'px' | 'em' | '%';
type SizeValue = `${number}${SizeUnit}`;

// mapped types
// type CssDeclaration = {
//   [Key in ValidProperty]?: SizeValue
// };

type CssDeclaration = Partial<Record<ValidProperty, SizeValue>>;

// type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
// }

// type PartialPerson = Partial<Person>;

// type MyPartial<Obj extends Record<any, any>> = {
//   [Key in keyof Obj]?: Obj[Key]
// }

// const test: MyPartial<{test: string}> = {
//   test: 'bal',
// }

// type Check = typeof test;

// const cssObj: CssDeclaration = {
// }

type UserWithoutPassword = {
  firstName: string;
  lastName: string;
  email: string;
};

type User = UserWithoutPassword & { password: string };

const api = new ApiHelper<UserWithoutPassword>('/users');

const promise = api.getAll({
  headers: {
    'Content-Type': 'application/json',
  },
  search: {
    firstName: 'Paul',
  }
})

const users = await promise;
users[0].lastName
