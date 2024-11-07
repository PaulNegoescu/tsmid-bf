//1
const rowHeadings = [1, 2, 3, 4, 5, 6] as const;
const columnHeadings = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

type ColumnHeadings = (typeof columnHeadings)[number];
type RowHeadings = (typeof rowHeadings)[number];

type Coordinates = `${ColumnHeadings}${RowHeadings}`;
//     ^?

const statuses = ['idle', 'loading', 'error'] as const;
const objStatuses = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
} as const;

enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
}

function test(
  whatever: string,
  status: (typeof objStatuses)[keyof typeof objStatuses]
) {}

console.log(test('sdasd', Status.IDLE));

console.log('The status of the request is: ', objStatuses.LOADING, objStatuses);

// 2
type Input = string | number;

function addOrConcatenate(param1: number, param2: number): number;
function addOrConcatenate(param1: string, param2: string): string;
function addOrConcatenate(param1: Input, param2: Input): Input {
  if (typeof param1 === 'string' && typeof param2 === 'string') {
    return param1 + param2;
  }

  return Number(param1) + Number(param2);
}

const res = addOrConcatenate('2', '4');

console.log(addOrConcatenate(1, 3), addOrConcatenate('Paul ', 'Negoescu'));

type ConditionalType<T> = T extends string ? T : never;

const name: ConditionalType<'Paul' | 'Negoescu'> = 'asdas';

const arr = [[[[1, 2]], [[4, 5]]]];
// const arr = [1, 2, 3];

type InsideArr<T> = T extends Array<infer I> ? InsideArr<I> : T;

type InnerType = InsideArr<typeof arr>;
//     ^?

type ReturnType<T extends (...params: any) => any> = T extends (
  ...params: any
) => infer R
  ? R
  : never;

function parent<T extends (...p: any[]) => any>(child: T): ReturnType<T> {
  return child(1, 2);
}

function add(...params: number[]): number {
  return params.reduce((num1, num2) => num1 + num2);
}

function sayHello(name: string) {
  return 'Hello ' + name;
}

type test2 = ReturnType<typeof add>;

const result = parent(sayHello);
//       ^?
console.log(result);
