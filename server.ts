import express from 'express';
import cors from 'cors';

import afiRouter from './routes/afis';
import emailRouter from './routes/emails';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/email', emailRouter);
app.use('/api/afi', afiRouter);


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})