import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        checks: ['rate > 0.99']
    }
}

export default function(){
    const BASE_URL = 'http://localhost:9090/1';

    const res = http.get(BASE_URL);

    check(res, {
        'status code 200': (r) => r.status === 200
    });
}
