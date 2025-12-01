import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_NHeluGE79cAn@ep-curly-art-ah4ks9pc-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

app.use(express.json());
// app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next level developer!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(201).json({
    success: true,
    messsage: "API is working",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
