"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../order");
var user_1 = require("../user");
var product_1 = require("../product");
var testOrder;
var testOrder2;
var testUser;
var originalTimeout;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.UserStore.create({
                    username: 'susancherry',
                    firstname: 'susan',
                    lastname: 'cherry',
                    password: 'bananasplit',
                })];
            case 1:
                testUser = _a.sent();
                return [4 /*yield*/, order_1.OrderStore.create({
                        status: 'active',
                        user_id: testUser.id,
                    })];
            case 2:
                testOrder = _a.sent();
                return [4 /*yield*/, order_1.OrderStore.create({
                        status: 'complete',
                        user_id: testUser.id,
                    })];
            case 3:
                testOrder2 = _a.sent();
                return [4 /*yield*/, product_1.ProductStore.create({
                        name: 'Cherries',
                        price: 2,
                        category: 'Fruit',
                    })];
            case 4:
                _a.sent();
                originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                return [2 /*return*/];
        }
    });
}); });
describe('OrderModel', function () {
    it('should have an index method', function () {
        expect(order_1.OrderStore.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(order_1.OrderStore.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(order_1.OrderStore.create).toBeDefined();
    });
    it('should have an update method', function () {
        expect(order_1.OrderStore.create).toBeDefined();
    });
    it('create method should add an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(testOrder.status).toEqual('active');
            return [2 /*return*/];
        });
    }); });
    it('should show orders by user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.OrderStore.show(testUser.id)];
                case 1:
                    orders = _a.sent();
                    expect(orders.length).not.toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update method should update the order data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.OrderStore.update(testOrder.id, {
                        status: 'complete',
                        user_id: testUser.id,
                    })];
                case 1:
                    updatedOrder = _a.sent();
                    expect(updatedOrder.status).toEqual('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete method should delete the entry', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deletedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.OrderStore.delete(testOrder2.id)];
                case 1:
                    deletedOrder = _a.sent();
                    expect(deletedOrder).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
