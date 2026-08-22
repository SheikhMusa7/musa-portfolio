import { randomBytes, timingSafeEqual } from "node:crypto";

type Challenge = {
  answer: string;
  expires: number;
};

const challenges = new Map<string, Challenge>();
const TTL_MS = 5 * 60 * 1000;
const MAX_CHALLENGES = 1000;

function prune() {
  if (challenges.size < MAX_CHALLENGES) return;
  const now = Date.now();
  for (const [k, v] of challenges) {
    if (v.expires < now) challenges.delete(k);
  }
}

const OPERATIONS = [
  { op: "+", fn: (a: number, b: number) => a + b },
  { op: "−", fn: (a: number, b: number) => a - b },
];

function rid(): string {
  return randomBytes(16).toString("hex");
}

export function createChallenge(): { id: string; question: string } {
  prune();
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 1;
  const op = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
  const answer = String(op.fn(a, b));
  const id = rid();
  challenges.set(id, { answer, expires: Date.now() + TTL_MS });
  return { id, question: `${a} ${op.op} ${b} = ?` };
}

export function verifyChallenge(id: string, given: string): boolean {
  const entry = challenges.get(id);
  if (!entry) return false;
  challenges.delete(id);
  if (entry.expires < Date.now()) return false;
  const want = Buffer.from(String(entry.answer).trim());
  const got = Buffer.from(String(given).trim());
  if (want.length !== got.length) return false;
  return timingSafeEqual(want, got);
}
