import http from "k6/http";
import {check} from "k6";
import {Counter} from "k6/metrics";

export const options = {
    vus: 1,
    duration: "5s"
};

const calls = new Counter('calls');

export default function () {
    const res = http.post("http://localhost:9090/1");
    calls.add(1);

    check(res, {
        "status is 200": (r) => r.status === 200,
        "transaction time OK": (r) => r.timings.duration < 200
    });

}


