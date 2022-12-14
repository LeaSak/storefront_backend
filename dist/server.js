"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./server/routes/index"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var address = process.env.POSTGRES_HOST;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Welcome');
});
app.use('/api', index_1.default);
app.listen(process.env.PORT, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
