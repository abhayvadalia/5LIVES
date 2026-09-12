import { readBrowserProfile } from './browser-profile';
import { findOption } from './catalog';

export const FIVE_KEY = '5lives.beginning.v2';
export const FIVE_DRAFT_KEY = '5lives.beginning-draft.v2';
export type Five = {
  version: 2;
  lives: string[];
  first: number | null;
  completed: number[];
  note: string;
  revision: number;
};
type Store = Pick<Storage, 'getItem' | 'setItem'>;

export function validateFive(value: unknown): Five {
  const v = value as Five;
  if (
    !v ||
    v.version !== 2 ||
    !Array.isArray(v.lives) ||
    v.lives.length < 1 ||
    v.lives.length > 5 ||
    v.lives.some((x) => typeof x !== 'string' || !x.trim() || x.length > 160) ||
    !Number.isSafeInteger(v.revision) ||
    v.revision < 1 ||
    !Array.isArray(v.completed) ||
    v.completed.some(
      (x) => !Number.isInteger(x) || x < 0 || x >= v.lives.length,
    ) ||
    (v.first !== null &&
      (!Number.isInteger(v.first) ||
        v.first < 0 ||
        v.first >= v.lives.length ||
        v.completed.includes(v.first))) ||
    typeof v.note !== 'string' ||
    v.note.length > 2000
  )
    throw new Error(
      'Your saved five could not be read. You can clear them in Your space.',
    );
  return { ...v, lives: v.lives.map((x) => x.trim()) };
}

export function readFive(storage: Store): Five | null {
  const raw = storage.getItem(FIVE_KEY);
  if (raw) return validateFive(JSON.parse(raw));
  const old = readBrowserProfile(storage);
  if (!old) return null;
  const ids = Object.values(old.choices).filter(
    (id): id is string => typeof id === 'string' && !!findOption(id),
  );
  if (!ids.length) return null;
  const first = old.active ? ids.indexOf(old.active) : -1;
  return {
    version: 2,
    lives: ids.map((id) => findOption(id)!.title),
    first: first < 0 ? null : first,
    completed: [],
    note: '',
    revision: 1,
  };
}

export function saveFive(
  storage: Store,
  value: Omit<Five, 'revision'>,
  revision: number,
): Five {
  if ((readFive(storage)?.revision ?? 0) !== revision)
    throw new Error(
      'Your five changed in another tab. Reload to see the latest version before saving.',
    );
  const next = validateFive({ ...value, revision: revision + 1 });
  storage.setItem(FIVE_KEY, JSON.stringify(next));
  return next;
}

export function suggestedBeginning(life: string) {
  if (
    /\b(song|songwriter|sing|singer|singing|vocal|vocalist|music|musician|guitar|guitarist)\b/i.test(
      life,
    )
  )
    return {
      href: '/experiences/song',
      label: 'Make a recording to keep',
      text: 'Our recording experience is taking shape in Kolkata. Add your name to hear when a host and date are confirmed.',
    };
  if (/\b(paint|painting|painter|canvas|visual artist)\b/i.test(life))
    return {
      href: '/experiences/painting',
      label: 'Make something for your wall',
      text: 'Our painting experience is taking shape in Kolkata. Add your name to hear when a host and date are confirmed.',
    };
  if (/cricket/i.test(life))
    return {
      href: '/experiences/cricket',
      label: 'Take your place in the game',
      text: 'Our hosted cricket match is taking shape in Kolkata. Add your name to hear when a ground and date are confirmed.',
    };
  return {
    href: '/membership',
    label: 'Find a little company',
    text: 'We are bringing together people in Kolkata who want to begin one thing. See what membership will include and register your interest.',
  };
}
