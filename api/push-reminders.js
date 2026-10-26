import webpush from "web-push";
import { cronAuthorized, hasMarker, json, listSubscriptions, removeSubscription, sendMarker } from "./push-store.js";

function localParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.filter(part => part.type !== "literal").map(part => [part.type, part.value]));
}

export default async function pushReminders(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "Metoden stöds inte." });
  }
  if (!cronAuthorized(req)) return json(res, 401, { error: "Obehörig." });

  const VAPID_PUBLIC_KEY = process.env.TR_OS_PUSH_VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE_KEY = process.env.TR_OS_PUSH_VAPID_PRIVATE_KEY;
  const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:hello@ykbs.app";
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return json(res, 503, { error: "Pushnotiser är inte konfigurerade." });
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  try {
    const records = await listSubscriptions();
    let sent = 0, removed = 0, skipped = 0, failed = 0;
    const now = new Date();
    for (const record of records) {
      if (!record?.data?.subscription || !record.data.timeZone || !/^([01]\d|2[0-3]):[0-5]\d$/.test(record.data.reminderTime || "")) {
        skipped++;
        continue;
      }
      const parts = localParts(now, record.data.timeZone);
      const day = parts.year + "-" + parts.month + "-" + parts.day;
      if (parts.hour + ":" + parts.minute < record.data.reminderTime || record.data.lastSentDay === day) {
        skipped++;
        continue;
      }
      const filename = record.pathname.split("/").at(-1).replace(/\.json$/, "");
      const marker = "push/sent/" + filename + "-" + day + ".json";
      if (await hasMarker(marker)) { skipped++; continue; }
      try {
        await webpush.sendNotification(record.data.subscription, JSON.stringify({
          title: "Dags för din YKB-stund",
          body: "Ett kort pass hjälper kunskapen att fastna. Fortsätt där du slutade.",
          url: "/?study=1",
          tag: "ykb-study-" + day,
        }), { TTL: 3600 });
        await sendMarker(marker, JSON.stringify({ sentAt: now.toISOString() }));
        sent++;
      } catch (error) {
        if (error?.statusCode === 404 || error?.statusCode === 410) {
          await removeSubscription(record.data.subscription.endpoint).catch(() => {});
          removed++;
        } else {
          failed++;
          console.error("Web Push delivery failed", { status: error?.statusCode || 0 });
        }
      }
    }
    return json(res, 200, { ok: true, sent, removed, skipped, failed });
  } catch (error) {
    console.error("Push reminder cron failed", error?.name || "unknown");
    return json(res, 503, { error: "Påminnelserna kunde inte skickas just nu." });
  }
}
