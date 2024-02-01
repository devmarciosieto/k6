import { group, check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '3s',
    tags:{
        name: 'my-test'
    },
    thresholds:{
        'http_req_duration{tipo:busca-por-id-1}': ['p(95) < 500']
    }
}

const id = 2;

export default function () {
    group('exemple get id 1', function () {
        const res = http.get(`http://localhost:9090/1`, {
            tags:{
                tipo: "busca-por-id-1"
            }
        });
        check(res, {
            'is status 200': (r) => r.status === 200,
        });
    });
    group('exemple get id 2', function () {
        const res2 =http.get(`http://localhost:9090/${id}`);
        check(res2, {
            'is status 200': (r) => r.status === 200,
        });
    });
}
