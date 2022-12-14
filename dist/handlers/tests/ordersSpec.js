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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var request = (0, supertest_1.default)(server_1.default);
var originalTimeout;
var userData;
var userInfo = {
    username: 'cherryripe',
    firstname: 'cherry',
    lastname: 'ripe',
    password: 'coconut',
};
var token;
var order;
var orderStatus;
var orderInfo = { status: 'active', user_id: 0 };
var product;
beforeAll(function () {
    return __awaiter(this, void 0, void 0, function () {
        var response, orderRequest, productRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/api/users').send(userInfo)];
                case 1:
                    response = _a.sent();
                    token = response.body;
                    userData = jsonwebtoken_1.default.decode(token);
                    orderInfo.user_id = userData.user.id;
                    return [4 /*yield*/, request
                            .post('/api/orders')
                            .auth(token, { type: 'bearer' })
                            .send(orderInfo)];
                case 2:
                    orderRequest = _a.sent();
                    order = orderRequest.body;
                    orderStatus = orderRequest.status;
                    return [4 /*yield*/, request
                            .post('/api/products')
                            .auth(token, { type: 'bearer' })
                            .send({
                            name: 'Cherries',
                            price: 2,
                            category: 'Fruit',
                        })];
                case 3:
                    productRequest = _a.sent();
                    product = productRequest.body;
                    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                    return [2 /*return*/];
            }
        });
    });
});
describe('Orders', function () {
    var _this = this;
    describe('Status 200', function () {
        var _this = this;
        it('test request: all orders', function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/orders')
                            .auth(token, { type: 'bearer' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Status 200', function () {
        var _this = this;
        it('test request: all orders by user', function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/api/orders/' + userData.user.id)
                            .auth(token, { type: 'bearer' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('POST user', function () {
        it('should create an order', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(orderStatus).toBe(200);
                return [2 /*return*/];
            });
        }); });
    });
    describe('UPDATE order', function () {
        it('should update an order', function () { return __awaiter(_this, void 0, void 0, function () {
            var update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .put('/api/orders/' + order.id)
                            .auth(token, { type: 'bearer' })
                            .send({
                            status: 'pending',
                            user_id: order.user_id,
                        })];
                    case 1:
                        update = _a.sent();
                        expect(update.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ADD products to order', function () {
        it('should add a product to an order', function () { return __awaiter(_this, void 0, void 0, function () {
            var update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/orders/' + String(order.id) + '/products')
                            .auth(token, { type: 'bearer' })
                            .send({ quantity: 2, product_id: product.id })];
                    case 1:
                        update = _a.sent();
                        expect(update.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('DELETE an order', function () {
        it('should delete an order', function () { return __awaiter(_this, void 0, void 0, function () {
            var testOrder, deleteOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/api/orders')
                            .auth(token, { type: 'bearer' })
                            .send(orderInfo)];
                    case 1:
                        testOrder = _a.sent();
                        return [4 /*yield*/, request
                                .delete('/api/orders/' + testOrder.body.id)
                                .auth(token, { type: 'bearer' })];
                    case 2:
                        deleteOrder = _a.sent();
                        expect(deleteOrder.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
