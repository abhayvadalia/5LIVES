import { categories, type CategoryId } from './catalog';
export const DRAFT_KEY = '5lives.intake.v1';
export const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
export type Choices = Partial<Record<CategoryId, string>>;
export type Intake = { choices: Choices; active: string | null; scene: string };
export const emptyIntake = (): Intake => ({
  choices: {},
  active: null,
  scene: '',
});
export function validateIntake(value: unknown, complete = true): Intake {
  if (!value || typeof value !== 'object')
    throw new Error('Choose one answer in each category.');
  const data = value as Record<string, unknown>;
  if (
    !data.choices ||
    typeof data.choices !== 'object' ||
    Array.isArray(data.choices)
  )
    throw new Error('Your choices could not be read.');
  const source = data.choices as Record<string, unknown>;
  if (Object.keys(source).some((key) => !categories.some((c) => c.id === key)))
    throw new Error('Unknown category.');
  const choices: Choices = {};
  for (const category of categories) {
    const answer = source[category.id];
    if (answer === undefined && !complete) continue;
    if (answer !== 'none' && !category.options.some((o) => o.id === answer))
      throw new Error(`Choose an answer for ${category.name}.`);
    choices[category.id] = answer as string;
  }
  const selected = Object.values(choices).filter((v) => v !== 'none');
  if (
    data.active !== null &&
    (typeof data.active !== 'string' || !selected.includes(data.active))
  )
    throw new Error('Your starting choice must be one of your five.');
  if (complete && selected.length > 0 && !data.active)
    throw new Error('Choose one place to start.');
  if (typeof data.scene !== 'string' || data.scene.length > 1200)
    throw new Error('Keep your scene to 1,200 characters.');
  return {
    choices,
    active: data.active as string | null,
    scene: data.scene.trim(),
  };
}
export function updateChoice(
  current: Intake,
  category: CategoryId,
  option: string,
): Intake {
  const previous = current.choices[category];
  return validateIntake(
    {
      ...current,
      choices: { ...current.choices, [category]: option },
      active:
        current.active === previous && previous !== option
          ? null
          : current.active,
    },
    false,
  );
}
export function serializeDraft(
  intake: Intake,
  saveScene: boolean,
  now = Date.now(),
) {
  return JSON.stringify({
    schemaVersion: 1,
    expiresAt: now + RETENTION_MS,
    intake: {
      ...validateIntake(intake, false),
      scene: saveScene ? intake.scene : '',
    },
    sceneSaved: saveScene,
  });
}
export function parseDraft(
  raw: string | null,
  now = Date.now(),
): { intake: Intake; sceneSaved: boolean } | null {
  try {
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (
      data.schemaVersion !== 1 ||
      !Number.isFinite(data.expiresAt) ||
      data.expiresAt <= now ||
      data.expiresAt > now + RETENTION_MS + 60000
    )
      return null;
    return {
      intake: validateIntake(data.intake, false),
      sceneSaved: data.sceneSaved === true,
    };
  } catch {
    return null;
  }
}
