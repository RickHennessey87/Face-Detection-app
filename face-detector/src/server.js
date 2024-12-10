import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/clarifai', async (req, res) => {
  const { imageUrl } = req.body;
  const PAT = 'c3857ddf33814d8cbfaae7e09aa51e71';
  const USER_ID = 'rick-hennessey';
  const APP_ID = 'Face-detector';
  const MODEL_ID = 'face-detection';

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      { "data": { "image": { "url": imageUrl } } }
    ]
  });

  try {
    const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to communicate with Clarifai API' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
