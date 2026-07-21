import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check
app.get("/make-server-101d0b25/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit a contact message
app.post("/make-server-101d0b25/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "Name, email, and message are required." }, 400);
    }

    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const entry = { id, name, email, company: company || "", message, timestamp, read: false };

    await kv.set(`contact:${id}`, JSON.stringify(entry));

    console.log(`Contact message saved: ${id} from ${email}`);
    return c.json({ success: true, id });
  } catch (err) {
    console.log("Error saving contact message:", err);
    return c.json({ error: `Failed to save message: ${err}` }, 500);
  }
});

// Get all contact messages (for admin review)
app.get("/make-server-101d0b25/contact", async (c) => {
  try {
    const entries = await kv.getByPrefix("contact:");
    const messages = entries
      .map((e: string) => {
        try { return JSON.parse(e); } catch { return null; }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ messages });
  } catch (err) {
    console.log("Error fetching contact messages:", err);
    return c.json({ error: `Failed to fetch messages: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
