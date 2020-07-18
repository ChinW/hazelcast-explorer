"use strict";
/*
 * Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Connection Retry Config is controls the period among the retries and when should a client gave up
 * retrying. Exponential behaviour can be chosen or jitter can be added to wait periods.
 */
var ConnectionRetryConfig = /** @class */ (function () {
    function ConnectionRetryConfig() {
        /**
         * How long to wait after the first failure before retrying. Must be non-negative.
         */
        this.initialBackoffMillis = 1000;
        /**
         * When backoff reaches this upper bound, it does not increase any more. Must be non-negative.
         */
        this.maxBackoffMillis = 30000;
        /**
         * Timeout value in milliseconds for the client to give up to connect to the current cluster.
         */
        this.clusterConnectTimeoutMillis = 20000;
        /**
         * Factor with which to multiply backoff after a failed retry. Must be greater than or equal to 1.
         */
        this.multiplier = 1;
        /**
         * By how much to randomize backoffs.
         * At each iteration calculated back-off is randomized via following method
         * Random(-jitter * current_backoff, jitter * current_backoff)
         * It must be in range [0.0, 1.0].
         */
        this.jitter = 0;
    }
    return ConnectionRetryConfig;
}());
exports.ConnectionRetryConfig = ConnectionRetryConfig;
//# sourceMappingURL=ConnectionRetryConfig.js.map