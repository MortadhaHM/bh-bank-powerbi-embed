const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve static distribution path (Angular output)
const distFrontend = path.join(__dirname, '../app/dist/frontend/browser');
const distApp = path.join(__dirname, '../app/dist/app/browser');
const distPath = fs.existsSync(distFrontend) ? distFrontend : distApp;

app.use(express.static(distPath));

// SPA fallback routing for Angular client-side routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Angular build not found. Run "npm run build" in /app first.');
  }
});

app.listen(PORT, () => {
  console.log(`BH Bank Power BI App serving static build on http://localhost:${PORT}`);
});
