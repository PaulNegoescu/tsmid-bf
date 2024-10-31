let test: string | number = 'Paul';
test = 42;

function add(num1: number, num2: number) {
  return num1 + num2;
}


if(typeof test === 'number') {
  console.log(add(1, test));
}


// const arr: unknown[] = [1, 2, 3];
// arr.push('Paul');

console.log(test);

const arr: [number, number, string] = [1, 2, '3'];

type MyObj = {
  readonly id?: number;
  firstName: string;
  age: number;
  sayHello?: () => string;
};

interface MyObj2 {
  readonly id?: number;
  firstName: string;
  age: number;
  sayHello?: () => string;
}

// interface MyObjWithLastName extends MyObj2 {
//   lastName: string;
// }

type MyObjWithLastName = MyObj & { lastName: string }

const obj: MyObjWithLastName = {
  id: 1,
  firstName: 'Paul',
  age: 39,
  lastName: 'Negoescu',
  // sayHello() {
  //   return `Hello from ${this.firstName}`;
  // }
}

const obj2: MyObj2 = structuredClone(obj);

obj2.firstName = 'Andrei';

console.log(obj.firstName, obj2.firstName);

class Person implements MyObjWithLastName {
  constructor(public firstName: string, public lastName: string, public age: number, public height: number, public id?: number) {}
}

const obj3 = new Person('Ioana', 'Moise', 1.75, 22);

console.log(obj3, obj2);

function changeName(person: Person, fName: string) {
  person.firstName = fName;
}

console.log(changeName(obj3, 'Tania'));

type Myfunc = (person: Person, fName: string) => void;
function thisHasACallback(cb: Myfunc) {
  //
  cb(obj3, 'Ion');
}

const div = document.querySelector<HTMLDivElement>('#app');

function myFetcher(resource: 'users' | 'books'): Promise<Person> {
  return fetch('http://myapi.com/api/v2/' + resource).then((res) => res.json())
}

myFetcher('users').then((data) => data.firstName)
