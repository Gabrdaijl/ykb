export type AdamLanguage = "sv" | "ar";

export async function adamVoiceStatus(signal?: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch("/api/speech", { cache: "no-store", signal });
    if (!response.ok) return false;
    const result = await response.json() as { configured?: boolean; voice?: string };
    return result.configured === true && result.voice === "Adam";
  } catch {
    return false;
  }
}

export async function createAdamAudio(text: string, language: AdamLanguage, speed: number, signal?: AbortSignal): Promise<{ audio: HTMLAudioElement; objectUrl: string }> {
  const response = await fetch("/api/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language, speed }),
    signal,
  });
  if (!response.ok) {
    const details = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(details?.error || "Adam-rösten kunde inte spela upp ljudet.");
  }
  const blob = await response.blob();
  if (!blob.type.includes("audio/")) throw new Error("Adam-rösten skickade inget ljud.");
  const objectUrl = URL.createObjectURL(blob);
  return { audio: new Audio(objectUrl), objectUrl };
}