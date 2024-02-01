import http from "k6/http";
import {check} from "k6";
import {Counter} from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    duration: "5s",
    thresholds: {
        "http_req_failed": ["rate < 0.01"], // http errors should be less than 1%, 99% of requests should be successful
        "http_req_duration": [{threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10s'}],
        checks: ["rate > 0.95"] // 95% of checks should pass

    }
};

const calls = new Counter('numeber_of_calls');
const gauge = new Gauge('blocked_time');
const rate = new Rate('taxa_req_200');
const trend = new Trend('waiting_time');

export default function () {
    const res = http.get("http://localhost:9090/1");

    // counter
    calls.add(1);

    // meter
    gauge.add(res.timings.blocked);

    // rate
    rate.add(res.status === 200);

    // trend
    trend.add(res.timings.waiting);


    check(res, {
        "status is 200": (r) => r.status === 200,
        "transaction time OK": (r) => r.timings.duration < 200
    });


}


