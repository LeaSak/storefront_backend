"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userHandler_1 = __importDefault(require("../../../handlers/userHandler"));
var verifyAuthToken_1 = __importDefault(require("../../../middleware/verifyAuthToken"));
var userRouter = express_1.default.Router();
userRouter.get('/', verifyAuthToken_1.default, userHandler_1.default.index);
userRouter.get('/:id', verifyAuthToken_1.default, userHandler_1.default.show);
userRouter.post('/', userHandler_1.default.create);
userRouter.put('/:id', verifyAuthToken_1.default, userHandler_1.default.update);
userRouter.delete('/:id', verifyAuthToken_1.default, userHandler_1.default.destroy);
userRouter.post('/authenticate', userHandler_1.default.authenticate);
exports.default = userRouter;
