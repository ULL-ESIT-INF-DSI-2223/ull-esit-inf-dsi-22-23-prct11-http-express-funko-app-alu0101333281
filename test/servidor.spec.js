"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const chai_1 = require("chai");
describe('execmd endpoint', () => {
    const baseUrl = 'http://localhost:3000';
    it('should return 400 if cmd parameter is missing', (done) => {
        (0, request_1.default)(`${baseUrl}/execmd`, (error, response, body) => {
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(JSON.parse(body)).to.deep.equal({ error: 'Parameter "cmd" is required' });
            done();
        });
    });
    it('should execute the specified command and return its output', (done) => {
        const cmd = 'echo';
        const args = 'hello world';
        const expectedOutput = 'hello world\n';
        (0, request_1.default)(`${baseUrl}/execmd?cmd=${cmd}&args=${args}`, (error, response, body) => {
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(JSON.parse(body)).to.deep.equal({ output: expectedOutput });
            done();
        });
    });
    it('should return 500 if the specified command does not exist', (done) => {
        const cmd = 'thiscommanddoesnotexist';
        (0, request_1.default)(`${baseUrl}/execmd?cmd=${cmd}`, (error, response, body) => {
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(JSON.parse(body)).to.have.property('error');
            done();
        });
    });
});
