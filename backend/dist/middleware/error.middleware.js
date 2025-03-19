"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        error: error.message || '서버 에러가 발생했습니다.'
    });
};
exports.errorHandler = errorHandler;
