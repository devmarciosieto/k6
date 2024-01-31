import http from "k6/http";
import {check} from "k6";
import {Counter} from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    duration: "5s"
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


