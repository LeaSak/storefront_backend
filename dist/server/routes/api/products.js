"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productHandler_1 = __importDefault(require("../../../handlers/productHandler"));
var verifyAuthToken_1 = __importDefault(require("../../../middleware/verifyAuthToken"));
var productsRouter = express_1.default.Router();
productsRouter.get('/', productHandler_1.default.index);
productsRouter.get('/:id', productHandler_1.default.show);
productsRouter.post('/', verifyAuthToken_1.default, productHandler_1.default.create);
productsRouter.delete('/:id', verifyAuthToken_1.default, productHandler_1.default.destroy);
productsRouter.put('/:id', verifyAuthToken_1.default, productHandler_1.default.update);
exports.default = productsRouter;
