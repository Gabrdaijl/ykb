const ADAM_VOICE_ID = "x0u3EW21dbrORJzOq1m9";
const ADAM_VOICE_NAME = "Adam Composer - Resonant and Smooth";
const hourlyRequests = new Map();

function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.send(JSON.stringify(payload));
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  try {
    return new URL(origin).host.toLowerCase() === String(req.headers.host || "").toLowerCase();
  } catch {
    return false;
  }
}

function parseBody(body) {
  if (body && typeof body === "object") return body;
  if (typeof body !== "string") return null;
  try { return JSON.parse(body); } catch { return null; }
}

export default async function speech(req, res) {
  res.setHeader("Vary", "Origin");

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (req.method === "GET") {
    return json(res, 200, { configured: Boolean(apiKey), provider: "ElevenLabs", voice: ADAM_VOICE_NAME, model: "Eleven v4" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { error: "Den här ljudförfrågan stöds inte." });
  }
  if (!sameOrigin(req)) return json(res, 403, { error: "Begäran avvisades. Ladda om TR-os och försök igen." });
  if (!apiKey) return json(res, 503, { error: "Adam-rösten är inte ansluten till appen ännu." });

  const { text, language = "sv", speed = 1 } = parseBody(req.body) || {};
  if (typeof text !== "string" || text.trim().length < 1 || text.length > 1200 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text) || !["sv", "ar"].includes(language) || typeof speed !== "number" || !Number.isFinite(speed) || speed < 0.7 || speed > 1.2) {
    return json(res, 400, { error: "Välj en svensk eller arabisk YKB-text på högst 1 200 tecken." });
  }

  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const requester = forwarded || "unknown";
  const now = Date.now();
  const hour = Math.floor(now / 3_600_000);
  const previous = hourlyRequests.get(requester);
  if (!previous || previous.hour !== hour) hourlyRequests.set(requester, { hour, count: 0 });
  const bucket = hourlyRequests.get(requester);
  if (bucket.count >= 24) return json(res, 429, { error: "Timgränsen för Adam-rösten är nådd. Försök igen senare." });
  bucket.count += 1;
  if (hourlyRequests.size > 500) {
    for (const [key, value] of hourlyRequests) if (value.hour !== hour) hourlyRequests.delete(key);
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(ADAM_VOICE_ID)}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_v4",
        language_code: language,
        voice_settings: { stability: 0.55, similarity_boost: 0.75, speed },
      }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) {
      if (response.status === 429) return json(res, 429, { error: "ElevenLabs har nått sin ljudgräns. Försök igen senare." });
      return json(res, 502, { error: "Adam-rösten kunde inte skapa ljud just nu. Försök igen senare." });
    }
    const audio = Buffer.from(await response.arrayBuffer());
    if (!audio.length || audio.length > 8_000_000) return json(res, 502, { error: "Adam-rösten skickade ett ogiltigt ljud." });
    res.status(200);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", String(audio.length));
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.send(audio);
  } catch {
    return json(res, 504, { error: "Adam-rösten svarade inte i tid. Försök igen." });
  }
};