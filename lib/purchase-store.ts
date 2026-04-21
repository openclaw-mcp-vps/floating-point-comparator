import fs from "node:fs/promises";
import path from "node:path";

interface StoredSession {
  sessionId: string;
  customerEmail?: string;
  purchasedAt: string;
  redeemedAt?: string;
}

interface PurchaseStore {
  sessions: Record<string, StoredSession>;
}

const STORE_PATH = path.join(process.cwd(), "data", "purchases.json");

async function ensureStoreExists() {
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify({ sessions: {} }, null, 2), "utf8");
  }
}

async function readStore(): Promise<PurchaseStore> {
  await ensureStoreExists();
  const content = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(content) as PurchaseStore;
}

async function writeStore(store: PurchaseStore): Promise<void> {
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function upsertPaidSession(
  sessionId: string,
  customerEmail?: string
): Promise<void> {
  const store = await readStore();
  store.sessions[sessionId] = {
    sessionId,
    customerEmail,
    purchasedAt: new Date().toISOString(),
    redeemedAt: store.sessions[sessionId]?.redeemedAt
  };

  await writeStore(store);
}

export async function findPaidSession(
  sessionId: string
): Promise<StoredSession | undefined> {
  const store = await readStore();
  return store.sessions[sessionId];
}

export async function markSessionRedeemed(sessionId: string): Promise<void> {
  const store = await readStore();
  const existing = store.sessions[sessionId];
  if (!existing) {
    return;
  }

  store.sessions[sessionId] = {
    ...existing,
    redeemedAt: new Date().toISOString()
  };

  await writeStore(store);
}
