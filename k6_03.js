import http from "k6/http";
import { check } from "k6";

export const options = {
    vus: 10,
    duration: "5s"
};

export default function() {
    const res = http.get("http://localhost:9090/1");

    check(res, {
        "status is 200": (r) => r.status === 200,
        "transaction time OK": (r) => r.timings.duration < 200
    });
}