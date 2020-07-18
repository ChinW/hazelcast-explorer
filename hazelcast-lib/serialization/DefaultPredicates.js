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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Predicate_1 = require("../core/Predicate");
var Util_1 = require("../Util");
var PredicateFactory_1 = require("./PredicateFactory");
var SqlPredicate = /** @class */ (function (_super) {
    __extends(SqlPredicate, _super);
    function SqlPredicate(sql) {
        var _this = _super.call(this) || this;
        _this.sql = sql;
        return _this;
    }
    SqlPredicate.prototype.readData = function (input) {
        this.sql = input.readUTF();
    };
    SqlPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.sql);
    };
    SqlPredicate.prototype.getClassId = function () {
        return 0;
    };
    return SqlPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.SqlPredicate = SqlPredicate;
var AndPredicate = /** @class */ (function (_super) {
    __extends(AndPredicate, _super);
    function AndPredicate() {
        var predicates = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            predicates[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.predicates = predicates;
        return _this;
    }
    AndPredicate.prototype.readData = function (input) {
        var s = input.readInt();
        this.predicates = [];
        for (var i = 0; i < s; i++) {
            this.predicates[i] = input.readObject();
        }
    };
    AndPredicate.prototype.writeData = function (output) {
        output.writeInt(this.predicates.length);
        this.predicates.forEach(function (pred) {
            output.writeObject(pred);
        });
    };
    AndPredicate.prototype.getClassId = function () {
        return 1;
    };
    return AndPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.AndPredicate = AndPredicate;
var BetweenPredicate = /** @class */ (function (_super) {
    __extends(BetweenPredicate, _super);
    function BetweenPredicate(field, from, to) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.from = from;
        _this.to = to;
        return _this;
    }
    BetweenPredicate.prototype.readData = function (input) {
        this.field = input.readUTF();
        this.to = input.readObject();
        this.from = input.readObject();
    };
    BetweenPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.field);
        output.writeObject(this.to);
        output.writeObject(this.from);
    };
    BetweenPredicate.prototype.getClassId = function () {
        return 2;
    };
    return BetweenPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.BetweenPredicate = BetweenPredicate;
var EqualPredicate = /** @class */ (function (_super) {
    __extends(EqualPredicate, _super);
    function EqualPredicate(field, value) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.value = value;
        return _this;
    }
    EqualPredicate.prototype.readData = function (input) {
        this.field = input.readUTF();
        this.value = input.readObject();
    };
    EqualPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.field);
        output.writeObject(this.value);
    };
    EqualPredicate.prototype.getClassId = function () {
        return 3;
    };
    return EqualPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.EqualPredicate = EqualPredicate;
var GreaterLessPredicate = /** @class */ (function (_super) {
    __extends(GreaterLessPredicate, _super);
    function GreaterLessPredicate(field, value, equal, less) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.value = value;
        _this.equal = equal;
        _this.less = less;
        return _this;
    }
    GreaterLessPredicate.prototype.readData = function (input) {
        this.field = input.readUTF();
        this.value = input.readObject();
        this.equal = input.readBoolean();
        this.less = input.readBoolean();
        return this;
    };
    GreaterLessPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.field);
        output.writeObject(this.value);
        output.writeBoolean(this.equal);
        output.writeBoolean(this.less);
    };
    GreaterLessPredicate.prototype.getClassId = function () {
        return 4;
    };
    return GreaterLessPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.GreaterLessPredicate = GreaterLessPredicate;
var LikePredicate = /** @class */ (function (_super) {
    __extends(LikePredicate, _super);
    function LikePredicate(field, expr) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.expr = expr;
        return _this;
    }
    LikePredicate.prototype.readData = function (input) {
        this.field = input.readUTF();
        this.expr = input.readUTF();
        return this;
    };
    LikePredicate.prototype.writeData = function (output) {
        output.writeUTF(this.field);
        output.writeUTF(this.expr);
    };
    LikePredicate.prototype.getClassId = function () {
        return 5;
    };
    return LikePredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.LikePredicate = LikePredicate;
var ILikePredicate = /** @class */ (function (_super) {
    __extends(ILikePredicate, _super);
    function ILikePredicate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ILikePredicate.prototype.getClassId = function () {
        return 6;
    };
    return ILikePredicate;
}(LikePredicate));
exports.ILikePredicate = ILikePredicate;
var InPredicate = /** @class */ (function (_super) {
    __extends(InPredicate, _super);
    function InPredicate(field) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.values = values;
        return _this;
    }
    InPredicate.prototype.readData = function (input) {
        this.field = input.readUTF();
        var s = input.readInt();
        this.values = [];
        for (var i = 0; i < s; i++) {
            this.values.push(input.readObject());
        }
        return this;
    };
    InPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.field);
        output.writeInt(this.values.length);
        this.values.forEach(function (val) {
            output.writeObject(val);
        });
    };
    InPredicate.prototype.getClassId = function () {
        return 7;
    };
    return InPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.InPredicate = InPredicate;
var InstanceOfPredicate = /** @class */ (function (_super) {
    __extends(InstanceOfPredicate, _super);
    function InstanceOfPredicate(className) {
        var _this = _super.call(this) || this;
        _this.className = className;
        return _this;
    }
    InstanceOfPredicate.prototype.readData = function (input) {
        this.className = input.readUTF();
        return this;
    };
    InstanceOfPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.className);
    };
    InstanceOfPredicate.prototype.getClassId = function () {
        return 8;
    };
    return InstanceOfPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.InstanceOfPredicate = InstanceOfPredicate;
var NotEqualPredicate = /** @class */ (function (_super) {
    __extends(NotEqualPredicate, _super);
    function NotEqualPredicate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotEqualPredicate.prototype.getClassId = function () {
        return 9;
    };
    return NotEqualPredicate;
}(EqualPredicate));
exports.NotEqualPredicate = NotEqualPredicate;
var NotPredicate = /** @class */ (function (_super) {
    __extends(NotPredicate, _super);
    function NotPredicate(pred) {
        var _this = _super.call(this) || this;
        _this.pred = pred;
        return _this;
    }
    NotPredicate.prototype.readData = function (input) {
        this.pred = input.readObject();
        return this;
    };
    NotPredicate.prototype.writeData = function (output) {
        output.writeObject(this.pred);
    };
    NotPredicate.prototype.getClassId = function () {
        return 10;
    };
    return NotPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.NotPredicate = NotPredicate;
var OrPredicate = /** @class */ (function (_super) {
    __extends(OrPredicate, _super);
    function OrPredicate() {
        var preds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            preds[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.preds = preds;
        return _this;
    }
    OrPredicate.prototype.readData = function (input) {
        var s = input.readInt();
        this.preds = [];
        for (var i = 0; i < s; i++) {
            this.preds.push(input.readObject());
        }
        return this;
    };
    OrPredicate.prototype.writeData = function (output) {
        output.writeInt(this.preds.length);
        this.preds.forEach(function (pred) {
            output.writeObject(pred);
        });
    };
    OrPredicate.prototype.getClassId = function () {
        return 11;
    };
    return OrPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.OrPredicate = OrPredicate;
var RegexPredicate = /** @class */ (function (_super) {
    __extends(RegexPredicate, _super);
    function RegexPredicate(field, regex) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.regex = regex;
        return _this;
    }
    RegexPredicate.prototype.readData = function (input) {
        this.field = input.readUTF();
        this.regex = input.readUTF();
        return this;
    };
    RegexPredicate.prototype.writeData = function (output) {
        output.writeUTF(this.field);
        output.writeUTF(this.regex);
    };
    RegexPredicate.prototype.getClassId = function () {
        return 12;
    };
    return RegexPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.RegexPredicate = RegexPredicate;
var FalsePredicate = /** @class */ (function (_super) {
    __extends(FalsePredicate, _super);
    function FalsePredicate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FalsePredicate.prototype.readData = function (input) {
        // Empty method
    };
    FalsePredicate.prototype.writeData = function (output) {
        // Empty method
    };
    FalsePredicate.prototype.getClassId = function () {
        return 13;
    };
    FalsePredicate.INSTANCE = new FalsePredicate();
    return FalsePredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.FalsePredicate = FalsePredicate;
var TruePredicate = /** @class */ (function (_super) {
    __extends(TruePredicate, _super);
    function TruePredicate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TruePredicate.prototype.readData = function (input) {
        // Empty method
    };
    TruePredicate.prototype.writeData = function (output) {
        // Empty method
    };
    TruePredicate.prototype.getClassId = function () {
        return 14;
    };
    TruePredicate.INSTANCE = new TruePredicate();
    return TruePredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.TruePredicate = TruePredicate;
var PagingPredicate = /** @class */ (function (_super) {
    __extends(PagingPredicate, _super);
    function PagingPredicate(internalPredicate, pageSize, comparator) {
        var _this = _super.call(this) || this;
        _this.page = 0;
        _this.iterationType = Predicate_1.IterationType.ENTRY;
        _this.anchorList = [];
        if (pageSize <= 0) {
            throw new TypeError('Page size should be greater than 0!');
        }
        _this.pageSize = pageSize;
        if (internalPredicate instanceof PagingPredicate) {
            throw new TypeError('Nested paging predicate is not supported!');
        }
        _this.internalPredicate = internalPredicate;
        _this.comparatorObject = comparator;
        return _this;
    }
    PagingPredicate.prototype.readData = function (input) {
        this.internalPredicate = input.readObject();
        this.comparatorObject = input.readObject();
        this.page = input.readInt();
        this.pageSize = input.readInt();
        this.iterationType = Util_1.enumFromString(Predicate_1.IterationType, input.readUTF());
        this.anchorList = [];
        var size = input.readInt();
        for (var i = 0; i < size; i++) {
            var p = input.readInt();
            var k = input.readObject();
            var v = input.readObject();
            this.anchorList.push([p, [k, v]]);
        }
    };
    PagingPredicate.prototype.writeData = function (output) {
        output.writeObject(this.internalPredicate);
        output.writeObject(this.comparatorObject);
        output.writeInt(this.page);
        output.writeInt(this.pageSize);
        output.writeUTF(Predicate_1.IterationType[this.iterationType]);
        output.writeInt(this.anchorList.length);
        this.anchorList.forEach(function (anchorEntry) {
            output.writeInt(anchorEntry[0]);
            output.writeObject(anchorEntry[1][0]);
            output.writeObject(anchorEntry[1][1]);
        });
    };
    PagingPredicate.prototype.getClassId = function () {
        return 15;
    };
    PagingPredicate.prototype.setIterationType = function (iterationType) {
        this.iterationType = iterationType;
    };
    PagingPredicate.prototype.nextPage = function () {
        this.page++;
        return this;
    };
    PagingPredicate.prototype.previousPage = function () {
        this.page--;
        return this;
    };
    PagingPredicate.prototype.setPage = function (page) {
        this.page = page;
        return this;
    };
    PagingPredicate.prototype.setAnchor = function (page, anchor) {
        var anchorEntry = [page, anchor];
        var anchorCount = this.anchorList.length;
        if (page < anchorCount) {
            this.anchorList[page] = anchorEntry;
        }
        else if (page === anchorCount) {
            this.anchorList.push(anchorEntry);
        }
        else {
            throw new RangeError('Anchor index is not correct, expected: ' + page + 'found: ' + anchorCount);
        }
    };
    PagingPredicate.prototype.setAnchorList = function (anchorList) {
        this.anchorList = anchorList;
    };
    PagingPredicate.prototype.getPredicate = function () {
        return this.internalPredicate;
    };
    PagingPredicate.prototype.getAnchorList = function () {
        return this.anchorList;
    };
    PagingPredicate.prototype.getPage = function () {
        return this.page;
    };
    PagingPredicate.prototype.getPageSize = function () {
        return this.pageSize;
    };
    PagingPredicate.prototype.getNearestAnchorEntry = function () {
        var anchorCount = this.anchorList.length;
        if (this.page === 0 || anchorCount === 0) {
            return PagingPredicate.NULL_ANCHOR;
        }
        var anchoredEntry;
        if (this.page < anchorCount) {
            anchoredEntry = this.anchorList[this.page - 1];
        }
        else {
            anchoredEntry = this.anchorList[anchorCount - 1];
        }
        return anchoredEntry;
    };
    PagingPredicate.prototype.getIterationType = function () {
        return this.iterationType;
    };
    PagingPredicate.prototype.getComparator = function () {
        return this.comparatorObject;
    };
    PagingPredicate.NULL_ANCHOR = [-1, null];
    return PagingPredicate;
}(PredicateFactory_1.AbstractPredicate));
exports.PagingPredicate = PagingPredicate;
//# sourceMappingURL=DefaultPredicates.js.map