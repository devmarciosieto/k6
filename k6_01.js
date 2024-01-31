// 1. initialization and is called once
import sleep from 'k6';


// 2. cofiguration
export const options = {
    vus: 1,
    duration: '5s',
};


// 3. execution
export default function () {
    console.log('Hello k6');
    sleep(1);
}


// 4. teardown and is called once
export function teardown(data) {
    console.log('Bye k6' + JSON.stringify(data));
}