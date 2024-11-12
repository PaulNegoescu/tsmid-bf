// 1 Branded Types
type PositiveNumber = number & {__brand: 'Positive'};

function delay(ms: PositiveNumber) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

function isPositive(num: number): num is PositiveNumber {
  return num >= 0;
}

(async function main(time: number) {
  if(!isPositive(time)) {
    return;
  }
  // a lot of stuff
  console.log('Before delay');

  await delay(time);
  console.log('After delay');
})(-2000);

// 2 
type ValidEmailAddress = string & {__brand: 'ValidEmail'};

function isValidEmail(str: string): str is ValidEmailAddress {
  return str.includes('@');
}

function sendMail(address: ValidEmailAddress) {
  //send mail functionality
  console.log('Mail sent to', address);
}

let emailAddress = 'Paul@test.com';
if(isValidEmail(emailAddress)) {
  sendMail(emailAddress);
}

// 3
const rectangle = {
  type: 'rectangle',
  width: 30,
  height: 10,
  x: 0, 
  y: 20,
};

const circle = {
  type: 'circle',
  x: 40,
  y: 70,
  radius: 12,
};

// Discriminated unions
type Shape = {
  type: 'rectangle';
  x: number;
  y: number;
  width?: number;
  height?: number;
} | {
  type: 'circle',
  x: number;
  y: number;
  radius?: number;
}

function isValidShape(shape: object): shape is Shape {
  return 'type' in shape && (shape.type === 'circle' || shape.type === 'rectangle');
}

function drawShape(shape: Shape) {
    if(shape.type === 'rectangle') {
      console.log('Drawing a rectangle with width:', shape.width);
    } else {
      console.log('Drawing shape with radius', shape.radius);
    }
}

if(isValidShape(circle)) {
  drawShape(circle);
}

if(isValidShape(rectangle)) {
  drawShape(rectangle);
}


// 4
const events = {
  click: 'click event',
  keyup: 'keyup event',
  keypress: 'keypress event',
  mousemove: 'mousemove event'
};

// type EventListeners = 'onClick' | 'onKeyup' ...;
type Events = typeof events;
type EventKeys = keyof Events;
type EventListeners = `on${Capitalize<EventKeys>}`;

function attachEventListener(listener: EventListeners, func: () => void) {
  console.log(`Attached listener to "${listener}" event.`, func());
}

attachEventListener('onClick', () => {});

type EventListenerObj = Partial<Record<EventListeners, () => void>>;
type EventListenerObjWithoutKeyUp = Omit<Record<EventListeners, () => void>, 'onKeyup'>;

const eventListeners: EventListenerObjWithoutKeyUp = {
  onClick: () => {},
  onKeypress: () => {},
  onMousemove: () => {},
}

console.log(eventListeners);

// 5
type Action = {
  type: 'reset',
} | {
  type: 'increment' | 'decrement',
  payload: number
};

const action1: Action = {type: 'reset'};
const action2: Action = {type: 'increment', payload: 5};
const action3: Action = {type: 'decrement', payload: 10};
// const action4: Action = {type: 0, payload: 'mwahaha'};
// const action5: Action = {type: '0', payload: 'mwahaha', test: 6};

console.log(action1, action2, action3);

// 6
type Person = {
  firstName: string;
  lastName: string;
}

function processDataFromServer(data: Person | string | null) {
  if (typeof data === 'object' && data !== null) {
    return data.firstName + ' ' + data.lastName;
  } else if(typeof data === 'string') {
    console.error('Error from server', data);
    return 0;
  } 
  
  return data;
}

const result = processDataFromServer({firstName: 'Paul', lastName: 'Negoescu'});

