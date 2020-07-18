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
/*tslint:disable:max-line-length*/
var BitsUtil_1 = require("../BitsUtil");
var FixSizedTypesCodec_1 = require("./builtin/FixSizedTypesCodec");
var ClientMessage_1 = require("../ClientMessage");
var StringCodec_1 = require("./builtin/StringCodec");
var DataCodec_1 = require("./builtin/DataCodec");
// hex: 0x021100
var REQUEST_MESSAGE_TYPE = 135424;
// hex: 0x021101
var RESPONSE_MESSAGE_TYPE = 135425;
var REQUEST_THREAD_ID_OFFSET = ClientMessage_1.PARTITION_ID_OFFSET + BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
var REQUEST_LEASE_OFFSET = REQUEST_THREAD_ID_OFFSET + BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
var REQUEST_TIMEOUT_OFFSET = REQUEST_LEASE_OFFSET + BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
var REQUEST_REFERENCE_ID_OFFSET = REQUEST_TIMEOUT_OFFSET + BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
var REQUEST_INITIAL_FRAME_SIZE = REQUEST_REFERENCE_ID_OFFSET + BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
var RESPONSE_RESPONSE_OFFSET = ClientMessage_1.RESPONSE_BACKUP_ACKS_OFFSET + BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
var MultiMapTryLockCodec = /** @class */ (function () {
    function MultiMapTryLockCodec() {
    }
    MultiMapTryLockCodec.encodeRequest = function (name, key, threadId, lease, timeout, referenceId) {
        var clientMessage = ClientMessage_1.ClientMessage.createForEncode();
        clientMessage.setRetryable(true);
        var initialFrame = ClientMessage_1.Frame.createInitialFrame(REQUEST_INITIAL_FRAME_SIZE);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeLong(initialFrame.content, REQUEST_THREAD_ID_OFFSET, threadId);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeLong(initialFrame.content, REQUEST_LEASE_OFFSET, lease);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeLong(initialFrame.content, REQUEST_TIMEOUT_OFFSET, timeout);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeLong(initialFrame.content, REQUEST_REFERENCE_ID_OFFSET, referenceId);
        clientMessage.addFrame(initialFrame);
        clientMessage.setMessageType(REQUEST_MESSAGE_TYPE);
        clientMessage.setPartitionId(-1);
        StringCodec_1.StringCodec.encode(clientMessage, name);
        DataCodec_1.DataCodec.encode(clientMessage, key);
        return clientMessage;
    };
    MultiMapTryLockCodec.decodeResponse = function (clientMessage) {
        var initialFrame = clientMessage.nextFrame();
        return {
            response: FixSizedTypesCodec_1.FixSizedTypesCodec.decodeBoolean(initialFrame.content, RESPONSE_RESPONSE_OFFSET),
        };
    };
    return MultiMapTryLockCodec;
}());
exports.MultiMapTryLockCodec = MultiMapTryLockCodec;
//# sourceMappingURL=MultiMapTryLockCodec.js.map