import request from 'request';
import { expect } from 'chai';

describe('execmd endpoint', () => {
  const baseUrl = 'http://localhost:3000';

  it('should return 400 if cmd parameter is missing', (done) => {
    request(`${baseUrl}/execmd`, (error, response, body) => {
      expect(response.statusCode).to.equal(400);
      expect(JSON.parse(body)).to.deep.equal({ error: 'Parameter "cmd" is required' });
      done();
    });
  });

  it('should execute the specified command and return its output', (done) => {
    const cmd = 'echo';
    const args = 'hello world';
    const expectedOutput = 'hello world\n';

    request(`${baseUrl}/execmd?cmd=${cmd}&args=${args}`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.deep.equal({ output: expectedOutput });
      done();
    });
  });

  it('should return 500 if the specified command does not exist', (done) => {
    const cmd = 'thiscommanddoesnotexist';

    request(`${baseUrl}/execmd?cmd=${cmd}`, (error, response, body) => {
      expect(response.statusCode).to.equal(500);
      expect(JSON.parse(body)).to.have.property('error');
      done();
    });
  });
});