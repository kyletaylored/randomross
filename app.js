import express from 'express';
import axios from 'axios';

const app = express();

// Route handler for serving a random Bob Ross painting
app.get('/', async (req, res) => {
  const url = 'https://api.github.com/repos/jwilber/Bob_Ross_Paintings/contents/data/paintings';

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'axios',
      },
    });

    const data = response.data;
    if (data && data.length > 0) {
      const item = data[Math.floor(Math.random() * data.length)];
      res.setHeader('Content-Type', 'image/jpeg');
      const imageResponse = await axios({
        url: item.download_url,
        method: 'GET',
        responseType: 'stream',
      });
      imageResponse.data.pipe(res);
    } else {
      res.status(404).send('No paintings found');
    }
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    res.status(500).send('Error fetching paintings');
  }
});

export default app;  // No explicit port listening
