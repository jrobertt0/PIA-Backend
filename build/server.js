"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/", (req, res) => {
    res.send("Hello World");
    console.log("Hello Wor");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
