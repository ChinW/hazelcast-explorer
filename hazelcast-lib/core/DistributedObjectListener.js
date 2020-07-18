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
 * DistributedObjectEvent is fired when a DistributedObject
 * is created or destroyed cluster-wide.
 */
var DistributedObjectEvent = /** @class */ (function () {
    function DistributedObjectEvent(eventType, serviceName, objectName) {
        this.eventType = eventType;
        this.serviceName = serviceName;
        this.objectName = objectName;
    }
    return DistributedObjectEvent;
}());
exports.DistributedObjectEvent = DistributedObjectEvent;
//# sourceMappingURL=DistributedObjectListener.js.map