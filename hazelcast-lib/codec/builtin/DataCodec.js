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
var ClientMessage_1 = require("../../ClientMessage");
var HeapData_1 = require("../../serialization/HeapData");
var CodecUtil_1 = require("./CodecUtil");
var DataCodec = /** @class */ (function () {
    function DataCodec() {
    }
    DataCodec.encode = function (clientMessage, data) {
        clientMessage.addFrame(new ClientMessage_1.Frame(data.toBuffer()));
    };
    DataCodec.encodeNullable = function (clientMessage, data) {
        if (data === null) {
            clientMessage.addFrame(ClientMessage_1.NULL_FRAME.copy());
        }
        else {
            clientMessage.addFrame(new ClientMessage_1.Frame(data.toBuffer()));
        }
    };
    DataCodec.decode = function (clientMessage) {
        return new HeapData_1.HeapData(clientMessage.nextFrame().content);
    };
    DataCodec.decodeNullable = function (clientMessage) {
        return CodecUtil_1.CodecUtil.nextFrameIsNullFrame(clientMessage) ? null : this.decode(clientMessage);
    };
    return DataCodec;
}());
exports.DataCodec = DataCodec;
//# sourceMappingURL=DataCodec.js.map