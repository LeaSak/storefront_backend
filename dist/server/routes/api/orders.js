"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orderHandler_1 = __importDefault(require("../../../handlers/orderHandler"));
var verifyAuthToken_1 = __importDefault(require("../../../middleware/verifyAuthToken"));
var ordersRouter = express_1.default.Router();
ordersRouter.get('/', verifyAuthToken_1.default, orderHandler_1.default.index);
ordersRouter.get('/:user_id', verifyAuthToken_1.default, orderHandler_1.default.show);
ordersRouter.post('/', verifyAuthToken_1.default, orderHandler_1.default.create);
ordersRouter.put('/:id', verifyAuthToken_1.default, orderHandler_1.default.update);
ordersRouter.post('/:id/products', verifyAuthToken_1.default, orderHandler_1.default.addProduct);
ordersRouter.delete('/:id', verifyAuthToken_1.default, orderHandler_1.default.destroy);
exports.default = ordersRouter;
