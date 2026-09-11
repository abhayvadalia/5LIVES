import { validateIntake, type Intake } from './intake';

export const BROWSER_PROFILE_KEY = '5lives.saved.v1';
export type BrowserProfile = Intake & { revision: number; updatedAt: string };
type BrowserStore = Pick<Storage, 'getItem' | 'setItem'>;

export function readBrowserProfile(
  storage: BrowserStore,
): BrowserProfile | null {
  const raw = storage.getItem(BROWSER_PROFILE_KEY);
  if (!raw) return null;
  const value = JSON.parse(raw);
  if (
    value.schemaVersion !== 1 ||
    !Number.isSafeInteger(value.revision) ||
    value.revision < 1 ||
    typeof value.updatedAt !== 'string'
  )
    throw new Error(
      'Your saved list could not be read. You can clear it in Your space and begin again.',
    );
  return {
    ...validateIntake(value),
    revision: value.revision,
    updatedAt: value.updatedAt,
  };
}

export function writeBrowserProfile(
  storage: BrowserStore,
  intake: Intake,
  revision: number,
  keepScene: boolean,
): BrowserProfile {
  const current = readBrowserProfile(storage);
  if ((current?.revision ?? 0) !== revision)
    throw new Error(
      'Your saved list changed in another tab. Review the latest list before replacing it.',
    );
  const saved = {
    ...validateIntake(intake),
    scene: keepScene ? intake.scene.trim() : '',
    revision: revision + 1,
    updatedAt: new Date().toISOString(),
  };
  storage.setItem(
    BROWSER_PROFILE_KEY,
    JSON.stringify({ schemaVersion: 1, ...saved }),
  );
  return saved;
}
