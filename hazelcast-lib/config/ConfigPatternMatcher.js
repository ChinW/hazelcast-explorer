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
var ConfigPatternMatcher = /** @class */ (function () {
    function ConfigPatternMatcher() {
    }
    /**
     *
     * @param configPatterns
     * @param itemName
     * @throws
     * @returns `null` if there is no matching pattern
     *          the best matching pattern otherwis
     */
    ConfigPatternMatcher.prototype.matches = function (configPatterns, itemName) {
        var _this = this;
        var bestMatchingPoint = -1;
        var matchingPattern = null;
        var duplicatePattern = null;
        configPatterns.forEach(function (pattern) {
            var currentPoint = _this.getMatchingPoint(pattern, itemName);
            if (currentPoint > bestMatchingPoint) {
                bestMatchingPoint = currentPoint;
                matchingPattern = pattern;
                duplicatePattern = null;
            }
            else if (currentPoint === bestMatchingPoint && matchingPattern != null) {
                duplicatePattern = matchingPattern;
                matchingPattern = pattern;
            }
        });
        if (duplicatePattern != null) {
            throw new TypeError('Found ambiguous configurations for item ' + itemName + ': "' + matchingPattern +
                '" vs "' + duplicatePattern + '". Please specify your configuration.');
        }
        return matchingPattern;
    };
    ConfigPatternMatcher.prototype.getMatchingPoint = function (pattern, itemName) {
        var index = pattern.indexOf('*');
        if (index === -1) {
            return -1;
        }
        var firstPart = pattern.substring(0, index);
        if (!itemName.startsWith(firstPart)) {
            return -1;
        }
        var secondPart = pattern.substring(index + 1);
        if (!itemName.endsWith(secondPart)) {
            return -1;
        }
        return firstPart.length + secondPart.length;
    };
    return ConfigPatternMatcher;
}());
exports.ConfigPatternMatcher = ConfigPatternMatcher;
//# sourceMappingURL=ConfigPatternMatcher.js.map