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
var EntryListUUIDLongCodec_1 = require("./builtin/EntryListUUIDLongCodec");
// hex: 0x1D0200
var REQUEST_MESSAGE_TYPE = 1901056;
// hex: 0x1D0201
var RESPONSE_MESSAGE_TYPE = 1901057;
var REQUEST_DELTA_OFFSET = ClientMessage_1.PARTITION_ID_OFFSET + BitsUtil_1.BitsUtil.INT_SIZE_IN_BYTES;
var REQUEST_GET_BEFORE_UPDATE_OFFSET = REQUEST_DELTA_OFFSET + BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
var REQUEST_TARGET_REPLICA_UUID_OFFSET = REQUEST_GET_BEFORE_UPDATE_OFFSET + BitsUtil_1.BitsUtil.BOOLEAN_SIZE_IN_BYTES;
var REQUEST_INITIAL_FRAME_SIZE = REQUEST_TARGET_REPLICA_UUID_OFFSET + BitsUtil_1.BitsUtil.UUID_SIZE_IN_BYTES;
var RESPONSE_VALUE_OFFSET = ClientMessage_1.RESPONSE_BACKUP_ACKS_OFFSET + BitsUtil_1.BitsUtil.BYTE_SIZE_IN_BYTES;
var RESPONSE_REPLICA_COUNT_OFFSET = RESPONSE_VALUE_OFFSET + BitsUtil_1.BitsUtil.LONG_SIZE_IN_BYTES;
var PNCounterAddCodec = /** @class */ (function () {
    function PNCounterAddCodec() {
    }
    PNCounterAddCodec.encodeRequest = function (name, delta, getBeforeUpdate, replicaTimestamps, targetReplicaUUID) {
        var clientMessage = ClientMessage_1.ClientMessage.createForEncode();
        clientMessage.setRetryable(false);
        var initialFrame = ClientMessage_1.Frame.createInitialFrame(REQUEST_INITIAL_FRAME_SIZE);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeLong(initialFrame.content, REQUEST_DELTA_OFFSET, delta);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeBoolean(initialFrame.content, REQUEST_GET_BEFORE_UPDATE_OFFSET, getBeforeUpdate);
        FixSizedTypesCodec_1.FixSizedTypesCodec.encodeUUID(initialFrame.content, REQUEST_TARGET_REPLICA_UUID_OFFSET, targetReplicaUUID);
        clientMessage.addFrame(initialFrame);
        clientMessage.setMessageType(REQUEST_MESSAGE_TYPE);
        clientMessage.setPartitionId(-1);
        StringCodec_1.StringCodec.encode(clientMessage, name);
        EntryListUUIDLongCodec_1.EntryListUUIDLongCodec.encode(clientMessage, replicaTimestamps);
        return clientMessage;
    };
    PNCounterAddCodec.decodeResponse = function (clientMessage) {
        var initialFrame = clientMessage.nextFrame();
        return {
            value: FixSizedTypesCodec_1.FixSizedTypesCodec.decodeLong(initialFrame.content, RESPONSE_VALUE_OFFSET),
            replicaCount: FixSizedTypesCodec_1.FixSizedTypesCodec.decodeInt(initialFrame.content, RESPONSE_REPLICA_COUNT_OFFSET),
            replicaTimestamps: EntryListUUIDLongCodec_1.EntryListUUIDLongCodec.decode(clientMessage),
        };
    };
    return PNCounterAddCodec;
}());
exports.PNCounterAddCodec = PNCounterAddCodec;
//# sourceMappingURL=PNCounterAddCodec.js.map