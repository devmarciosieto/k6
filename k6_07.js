import http from "k6/http";
import {check} from "k6";
import {Counter} from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    stages: [
        { duration: '10s', target: 20 },
        { duration: '10s', target: 20 },
        { duration: '5s', target: 15 },
        { duration: '10s', target: 0 }
    ]
};

const calls = new Counter('numeber_of_calls');
const gauge = new Gauge('blocked_time');
const rate = new Rate('taxa_req_200');
const trend = new Trend('waiting_time');

export default function () {
    const res = http.post("http://localhost:8081/order");

    // counter
    calls.add(1);

    // meter
    gauge.add(res.timings.blocked);

    // rate
    rate.add(res.status === 201);

    // trend
    trend.add(res.timings.waiting);


    check(res, {
        "status is 201": (r) => r.status === 201,
        "transaction time OK": (r) => r.timings.duration < 20000
    });


}


