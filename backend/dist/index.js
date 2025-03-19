"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_routes_1 = __importDefault(require("./routes/data.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com'
        : 'http://localhost:5173'
}));
app.use(express_1.default.json());
app.use('/api', data_routes_1.default);
app.use(error_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
