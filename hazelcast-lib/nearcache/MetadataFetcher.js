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
var Promise = require("bluebird");
var MapFetchNearCacheInvalidationMetadataCodec_1 = require("../codec/MapFetchNearCacheInvalidationMetadataCodec");
var MemberSelectors_1 = require("../core/MemberSelectors");
var InvocationService_1 = require("../invocation/InvocationService");
var MetadataFetcher = /** @class */ (function () {
    function MetadataFetcher(client) {
        this.logger = client.getLoggingService().getLogger();
        this.client = client;
        this.partitionService = this.client.getPartitionService();
    }
    MetadataFetcher.prototype.initHandler = function (handler) {
        var scanPromises = this.scanMembers([handler.getName()]);
        return Promise.all(scanPromises).then(function (responses) {
            responses.forEach(function (response) {
                var metadata = MapFetchNearCacheInvalidationMetadataCodec_1.MapFetchNearCacheInvalidationMetadataCodec.decodeResponse(response);
                handler.initUuid(metadata.partitionUuidList);
                handler.initSequence(metadata.namePartitionSequenceList[0]);
            });
        });
    };
    MetadataFetcher.prototype.fetchMetadata = function (handlers) {
        var _this = this;
        var objectNames = this.getObjectNames(handlers);
        var promises = this.scanMembers(objectNames);
        return Promise.each(promises, function (clientMessage) {
            _this.processResponse(clientMessage, handlers);
        }).then(function () { return undefined; });
    };
    MetadataFetcher.prototype.processResponse = function (responseMessage, handlers) {
        var _this = this;
        var metadata = MapFetchNearCacheInvalidationMetadataCodec_1.MapFetchNearCacheInvalidationMetadataCodec.decodeResponse(responseMessage);
        handlers.forEach(function (handler) {
            try {
                _this.repairUuids(handler, metadata.partitionUuidList);
                _this.repairSequences(handler, metadata.namePartitionSequenceList);
            }
            catch (e) {
                _this.logger.warn('MetadataFetcher', 'Can not get invalidation metadata ' + e.message);
            }
        });
    };
    MetadataFetcher.prototype.repairUuids = function (handler, partitionIdUuidList) {
        partitionIdUuidList.forEach(function (entry) {
            handler.checkOrRepairUuid(entry[0], entry[1]);
        });
    };
    MetadataFetcher.prototype.repairSequences = function (handler, partitionIdSequenceList) {
        partitionIdSequenceList.forEach(function (partitionIdSeq) {
            var pairs = partitionIdSeq[1];
            pairs.forEach(function (pair) {
                handler.checkOrRepairSequence(pair[0], pair[1], true);
            });
        });
    };
    MetadataFetcher.prototype.scanMembers = function (objectNames) {
        var _this = this;
        var members = this.client.getClusterService().getMembers(MemberSelectors_1.MemberSelectors.DATA_MEMBER_SELECTOR);
        var promises = [];
        members.forEach(function (member) {
            var request = MapFetchNearCacheInvalidationMetadataCodec_1.MapFetchNearCacheInvalidationMetadataCodec.encodeRequest(objectNames, member.uuid);
            var promise = _this.client.getInvocationService().invoke(new InvocationService_1.Invocation(_this.client, request));
            promises.push(promise);
        });
        return promises;
    };
    MetadataFetcher.prototype.getObjectNames = function (handlers) {
        var names = [];
        handlers.forEach(function (handler) {
            names.push(handler.getName());
        });
        return names;
    };
    return MetadataFetcher;
}());
exports.MetadataFetcher = MetadataFetcher;
//# sourceMappingURL=MetadataFetcher.js.map