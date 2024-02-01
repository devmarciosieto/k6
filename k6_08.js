import { check, group } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 4,
    duration: '5s',
    thresholds: {
        'http_req_duration{group:::request por id 1}': ['p(95) < 500']
    }
}

export default function(){
    group('request por id 1', function(){
        const response1 = http.get('http://localhost:9090/1');
        check(response1, {
            'status code 200 get id 1': (r) => r.status === 200
        });
    });


    group('request por id 2', function(){
        const response2 = http.get('http://localhost:9090/2');
        check(response2, {
            'status code 200 get id 2': (r) => r.status === 200
        });
    });

}
