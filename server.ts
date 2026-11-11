import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("krishisetu.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    role TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS crops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    quantity TEXT,
    price REAL,
    location TEXT,
    grade TEXT,
    image TEXT,
    seller_id TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS machinery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    location TEXT,
    image TEXT,
    seller_id TEXT,
    type TEXT
  );

  CREATE TABLE IF NOT EXISTS agri_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    price REAL,
    description TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS workers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    skill TEXT,
    wage REAL,
    distance REAL,
    availability TEXT,
    rating REAL,
    image TEXT,
    experience INTEGER
  );

  CREATE TABLE IF NOT EXISTS market_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    summary TEXT,
    date TEXT,
    category TEXT,
    trend_data TEXT
  );

  CREATE TABLE IF NOT EXISTS crop_intelligence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    soil_suitability TEXT,
    irrigation_needs TEXT,
    fertilizer_rec TEXT,
    pest_risks TEXT,
    disease_risks TEXT,
    image TEXT,
    growth_trend TEXT,
    yield_prediction TEXT
  );

  CREATE TABLE IF NOT EXISTS agri_shops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lat REAL,
    lng REAL,
    distance REAL
  );
`);

// Seed data if empty
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  db.prepare("INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)").run(
    "guest_123", "Guest User", "guest@example.com", "Farmer"
  );
  
  const crops = [
    ["Wheat", "500 kg", 2200, "Punjab", "A", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400", "Crop"],
    ["Rice", "1000 kg", 3500, "Haryana", "B", "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", "Crop"],
    ["Cotton Seeds", "50 kg", 1200, "Gujarat", "A", "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?w=400", "Seed"],
    ["Black Pepper", "10 kg", 5000, "Kerala", "A", "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400", "Spice"]
  ];
  const insertCrop = db.prepare("INSERT INTO crops (name, quantity, price, location, grade, image, seller_id, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  crops.forEach(c => insertCrop.run(...c, "guest_123"));

  const machinery = [
    ["Mahindra Tractor", 550000, "Punjab", "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400", "guest_123", "Tractor"],
    ["John Deere Harvester", 1200000, "Haryana", "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400", "guest_123", "Harvester"]
  ];
  const insertMachinery = db.prepare("INSERT INTO machinery (name, price, location, image, seller_id, type) VALUES (?, ?, ?, ?, ?, ?)");
  machinery.forEach(m => insertMachinery.run(...m));

  const services = [
    ["Soil Testing", "AgriLabs", 500, "Complete NPK and pH analysis", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"],
    ["Pesticide Spraying", "CropCare", 1500, "Professional drone-based spraying", "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=400"]
  ];
  const insertService = db.prepare("INSERT INTO agri_services (name, company, price, description, image) VALUES (?, ?, ?, ?, ?)");
  services.forEach(s => insertService.run(...s));

  const workers = [
    ["Ram Singh", "Harvesting", 500, 2.5, "Available", 4.8, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", 10],
    ["Laxmi Devi", "Sowing", 450, 1.2, "Busy", 4.9, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", 8],
    ["Arjun Kumar", "Pesticide Spraying", 600, 4.0, "Available", 4.5, "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", 5]
  ];
  const insertWorker = db.prepare("INSERT INTO workers (name, skill, wage, distance, availability, rating, image, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  workers.forEach(w => insertWorker.run(...w));

  const news = [
    ["Wheat Prices Surge", "Due to high demand in international markets, wheat prices have seen a 10% increase.", "2024-03-12", "Prices", JSON.stringify([{date: '1 Mar', value: 2000}, {date: '5 Mar', value: 2100}, {date: '12 Mar', value: 2200}])],
    ["New Subsidy Scheme", "Government announces new subsidies for solar pumps for small farmers.", "2024-03-11", "Policy", null],
    ["Monsoon Forecast", "IMD predicts normal monsoon for the upcoming Kharif season.", "2024-03-10", "Weather", null]
  ];
  const insertNews = db.prepare("INSERT INTO market_news (title, summary, date, category, trend_data) VALUES (?, ?, ?, ?, ?)");
  news.forEach(n => insertNews.run(...n));

  const cropIntel = [
    ["Wheat", "A major cereal grain.", "Loamy soil", "3-4 times", "Urea, DAP", "Aphids", "Rust", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400", JSON.stringify([{stage: 'Sowing', value: 10}, {stage: 'Tillering', value: 30}, {stage: 'Heading', value: 60}, {stage: 'Harvest', value: 100}]), JSON.stringify([{year: '2021', yield: 3.2}, {year: '2022', yield: 3.5}, {year: '2023', yield: 3.4}, {year: '2024', yield: 3.8}])]
  ];
  const insertIntel = db.prepare("INSERT INTO crop_intelligence (name, description, soil_suitability, irrigation_needs, fertilizer_rec, pest_risks, disease_risks, image, growth_trend, yield_prediction) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  cropIntel.forEach(i => insertIntel.run(...i));

  const shops = [
    ["Kisan Seva Kendra", 30.7333, 76.7794, 1.2],
    ["Agri Mart", 30.7444, 76.7894, 2.5]
  ];
  const insertShop = db.prepare("INSERT INTO agri_shops (name, lat, lng, distance) VALUES (?, ?, ?, ?)");
  shops.forEach(s => insertShop.run(...s));
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/crops", (req, res) => {
    const crops = db.prepare("SELECT * FROM crops").all();
    res.json(crops);
  });

  app.get("/api/machinery", (req, res) => {
    const machinery = db.prepare("SELECT * FROM machinery").all();
    res.json(machinery);
  });

  app.get("/api/services", (req, res) => {
    const services = db.prepare("SELECT * FROM agri_services").all();
    res.json(services);
  });

  app.get("/api/workers", (req, res) => {
    const workers = db.prepare("SELECT * FROM workers").all();
    res.json(workers);
  });

  app.get("/api/news", (req, res) => {
    const news = db.prepare("SELECT * FROM market_news").all();
    const parsedNews = news.map((n: any) => ({
      ...n,
      trendData: n.trend_data ? JSON.parse(n.trend_data) : null
    }));
    res.json(parsedNews);
  });

  app.get("/api/crop-intelligence", (req, res) => {
    const intel = db.prepare("SELECT * FROM crop_intelligence").all();
    const parsedIntel = intel.map((i: any) => ({
      ...i,
      growthTrend: JSON.parse(i.growth_trend),
      yieldPrediction: JSON.parse(i.yield_prediction)
    }));
    res.json(parsedIntel);
  });

  app.get("/api/shops", (req, res) => {
    const shops = db.prepare("SELECT * FROM agri_shops").all();
    res.json(shops);
  });

  app.get("/api/user/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    res.json(user);
  });

  app.post("/api/crops", (req, res) => {
    const { name, quantity, price, location, grade, image, seller_id } = req.body;
    const result = db.prepare("INSERT INTO crops (name, quantity, price, location, grade, image, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(name, quantity, price, location, grade, image, seller_id);
    res.json({ id: result.lastInsertRowid });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KrishiSetu Server running on http://localhost:${PORT}`);
  });
}

startServer();
