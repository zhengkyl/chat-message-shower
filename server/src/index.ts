import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono();

app.get("/", (c) => {
  return c.html("Hello Hono!");
});

app.get("/login/twitch", async (c) => {
  const state = Buffer.from(
    crypto.getRandomValues(new Uint8Array(32))
  ).toString("base64");

  const url =
    "https://id.twitch.tv/oauth2/authorize?" +
    new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      redirect_uri: process.env.TWITCH_REDIRECT_URI!,
      response_type: "code",
      scope: "user:read:email",
      state,
    });
  setCookie(c, "twitch_state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });

  return c.redirect(url);
});

app.get("/login/twitch/callback", async (c) => {
  const storedState = getCookie(c, "twitch_state");
  const state = c.req.query("state");
  if (storedState !== state) {
    return c.json({ error: "Invalid state" }, 400);
  }

  const error = c.req.query("error");
  if (error) {
    return c.json({ error: "Error" }, 400);
  }

  const code = c.req.query("code");
  if (!code) {
    return c.json({ error: "No code" }, 400);
  }

  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      client_secret: process.env.TWITCH_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.TWITCH_REDIRECT_URI!,
    }),
  });

  const data = await res.json();
  console.log(data);

  return c.json({});
});

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
