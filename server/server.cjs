const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure db.json exists
const dbPath = path.join(__dirname, 'db.json');
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({
    users: [],
    profiles: [],
    reviews: [],
    favorites: [],
    watchlist: [],
    ratings: [],
    comments: []
  }, null, 2));
}

const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '..', 'public')
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Set database
server.db = router.db;

// Middlewares
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Authorization rules
const rules = auth.rewriter({
  users: 600,
  profiles: 640,
  reviews: 644,
  favorites: 644,
  watchlist: 644,
  ratings: 644,
  comments: 644
});

server.use(rules);
server.use(auth);

// Custom routes
// Profile update with avatar upload
server.put('/profile/:userId', upload.single('avatar'), (req, res) => {
  const userId = parseInt(req.params.userId);
  const profileData = JSON.parse(req.body.profile);
  
  if (req.file) {
    profileData.avatar = `/uploads/${req.file.filename}`;
  }

  const profiles = server.db.get('profiles');
  let profile = profiles.find({ userId: userId }).value();

  if (profile) {
    profiles
      .find({ userId: userId })
      .assign(profileData)
      .write();
  } else {
    profiles
      .push({ ...profileData, userId: userId })
      .write();
  }

  res.json(profileData);
});

// Get user profile
server.get('/profile/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const profile = server.db
    .get('profiles')
    .find({ userId: userId })
    .value();

  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: 'Profile not found' });
  }
});

// Add movie to favorites
server.post('/favorites', (req, res) => {
  const { userId, movieId } = req.body;
  const favorites = server.db.get('favorites');
  
  const existing = favorites.find({ userId, movieId }).value();
  if (existing) {
    res.status(400).json({ error: 'Movie already in favorites' });
    return;
  }

  const favorite = favorites
    .push({ userId, movieId, addedAt: new Date().toISOString() })
    .write();

  res.json(favorite);
});

// Remove movie from favorites
server.delete('/favorites/:userId/:movieId', (req, res) => {
  const { userId, movieId } = req.params;
  const favorites = server.db.get('favorites');
  
  favorites
    .remove({ userId: parseInt(userId), movieId: movieId })
    .write();

  res.json({ success: true });
});

// Add movie to watchlist
server.post('/watchlist', (req, res) => {
  const { userId, movieId } = req.body;
  const watchlist = server.db.get('watchlist');
  
  const existing = watchlist.find({ userId, movieId }).value();
  if (existing) {
    res.status(400).json({ error: 'Movie already in watchlist' });
    return;
  }

  const item = watchlist
    .push({ userId, movieId, addedAt: new Date().toISOString() })
    .write();

  res.json(item);
});

// Remove movie from watchlist
server.delete('/watchlist/:userId/:movieId', (req, res) => {
  const { userId, movieId } = req.params;
  const watchlist = server.db.get('watchlist');
  
  watchlist
    .remove({ userId: parseInt(userId), movieId: movieId })
    .write();

  res.json({ success: true });
});

// Add review
server.post('/reviews', (req, res) => {
  const { userId, movieId, content, rating } = req.body;
  const reviews = server.db.get('reviews');
  
  const review = reviews
    .push({
      userId,
      movieId,
      content,
      rating,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    .write();

  res.json(review);
});

// Update review
server.put('/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  const { content, rating } = req.body;
  const reviews = server.db.get('reviews');
  
  const review = reviews
    .find({ id: parseInt(reviewId) })
    .assign({
      content,
      rating,
      updatedAt: new Date().toISOString()
    })
    .write();

  res.json(review);
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Auth enabled: http://localhost:${port}`);
});
