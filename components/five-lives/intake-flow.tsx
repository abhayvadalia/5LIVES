'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, LockKeyhole } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { categories, findOption, type CategoryId } from '@/lib/catalog';
import {
  DRAFT_KEY,
  emptyIntake,
  parseDraft,
  serializeDraft,
  updateChoice,
  validateIntake,
  type Intake,
} from '@/lib/intake';
type Saved = Intake & { revision: number; updatedAt: string };
export function FiveSummary({ intake }: { intake: Intake }) {
  return (
    <div className="five-summary">
      {categories.map((c) => (
        <div className="summary-row" key={c.id}>
          <span className="summary-category" style={{ background: c.color }}>
            {c.name}
          </span>
          <div>
            <strong>
              {intake.choices[c.id] === 'none'
                ? 'Nothing here yet'
                : (findOption(intake.choices[c.id] ?? '')?.title ??
                  'A possibility to discover')}
            </strong>
            {intake.active && intake.active === intake.choices[c.id] && (
              <span className="starting-label">Your starting point</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export function IntakeFlow({ review = false }: { review?: boolean }) {
  const [intake, setIntake] = useState<Intake>(emptyIntake);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState(0);
  const [saveScene, setSaveScene] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [serverCopy, setServerCopy] = useState<Saved | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localError, setLocalError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      let draft: ReturnType<typeof parseDraft> = null;
      try {
        draft = parseDraft(localStorage.getItem(DRAFT_KEY));
        if (!draft) localStorage.removeItem(DRAFT_KEY);
      } catch {
        setLocalError(
          'This browser cannot keep a local draft. Keep this page open until you save to your account.',
        );
      }
      if (draft) {
        setIntake(draft.intake);
        setSaveScene(draft.sceneSaved);
      }
      const category = new URLSearchParams(location.search).get('category');
      const index = categories.findIndex((c) => c.id === category);
      if (index >= 0) setStep(index);
      if (review && draft) {
        try {
          validateIntake(draft.intake);
          setStep(7);
        } catch {
          /* Finish missing answers first. */
        }
      }
      async function load() {
        try {
          const response = await fetch('/api/profile', { cache: 'no-store' });
          if (cancelled) return;
          setSignedIn(response.status !== 401);
          if (!response.ok) {
            if (response.status !== 401)
              setMessage(
                'We could not load your account. Your local draft is available; retry before saving.',
              );
            return;
          }
          const data = (await response.json()) as {
            profile: Saved | null;
            error: string;
          };
          if (cancelled) return;
          const profile = data.profile as Saved | null;
          if (profile) {
            validateIntake(profile);
            if (
              draft &&
              JSON.stringify(draft.intake) !==
                JSON.stringify({
                  choices: profile.choices,
                  active: profile.active,
                  scene: profile.scene,
                })
            ) {
              setServerCopy(profile);
            } else {
              setIntake(profile);
              setRevision(profile.revision);
              if (review) setStep(7);
            }
          }
        } catch {
          if (!cancelled)
            setMessage(
              'You appear to be offline. You can keep choosing; account saving needs a connection.',
            );
        } finally {
          if (!cancelled) setLoaded(true);
        }
      }
      void load();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [review]);
  useEffect(() => {
    if (!loaded || signedIn) return;
    try {
      localStorage.setItem(DRAFT_KEY, serializeDraft(intake, saveScene));
    } catch {
      queueMicrotask(() =>
        setLocalError(
          'Your browser could not save this draft. Keep this page open until account saving succeeds.',
        ),
      );
    }
  }, [intake, saveScene, loaded, signedIn]);
  useEffect(() => {
    if (loaded) heading.current?.focus();
  }, [step, loaded]);
  useEffect(() => {
    const context = (
      document as unknown as {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      context.registerTool(
        {
          name: 'stage_five_lives_choice',
          title: 'Choose a Five Lives possibility',
          description:
            'Stage a local category answer in the visible intake. Does not save to an account, request a match, or book.',
          inputSchema: {
            type: 'object',
            properties: {
              category: { type: 'string', enum: categories.map((c) => c.id) },
              option: { type: 'string' },
            },
            required: ['category', 'option'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input: unknown) {
            const v = input as { category: CategoryId; option: string };
            if (!v || !categories.some((c) => c.id === v.category))
              throw new Error('Unknown category');
            const next = updateChoice(intake, v.category, v.option);
            setIntake(next);
            setSaved(false);
            setStep(categories.findIndex((c) => c.id === v.category));
            return { staged: true, category: v.category, option: v.option };
          },
        },
        { signal: lifecycle.signal },
      );
    } catch {
      /* Optional browser capability; normal UI is always available. */
    }
    return () => lifecycle.abort();
  }, [intake]);
  const category = categories[Math.min(step, 4)];
  const selected = Object.values(intake.choices).filter((o) => o !== 'none');
  function choose(id: string) {
    setIntake((current) => updateChoice(current, category.id, id));
    setSaved(false);
    setMessage('');
  }
  function move(next: number) {
    setStep(next);
    setMessage('');
    setSaved(false);
  }
  async function refreshConflict() {
    setBusy(true);
    try {
      const r = await fetch('/api/profile', { cache: 'no-store' });
      const d = (await r.json()) as {
        profile: Saved | null;
        error: string;
        revision: number;
      };
      if (!r.ok) throw new Error(d.error);
      if (d.profile) {
        setServerCopy(d.profile);
        setMessage('Compare both lists below. Your current work is preserved.');
      } else setRevision(0);
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : 'Unable to reload saved choices.',
      );
    } finally {
      setBusy(false);
    }
  }
  async function save() {
    setMessage('');
    setBusy(true);
    try {
      const valid = validateIntake(intake);
      const r = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...valid, revision }),
      });
      const data = (await r.json()) as {
        profile: Saved | null;
        error: string;
        revision: number;
      };
      if (!r.ok) {
        if (r.status === 401) setSignedIn(false);
        throw new Error(data.error);
      }
      setRevision(data.revision);
      setSaved(true);
      setMessage('Your five are saved to your account.');
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* Account save is authoritative. */
      }
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : 'Saving is unavailable. Your current choices are still here.',
      );
    } finally {
      setBusy(false);
    }
  }
  if (!loaded)
    return (
      <main id="main" className="page-width content-page">
        <p role="status">Opening your possibilities…</p>
      </main>
    );
  return (
    <main id="main" className="page-width intake-page">
      <div className="intake-top">
        <Link href="/" className="back-link">
          ← Back to Five Lives
        </Link>
        <span>
          <LockKeyhole size={14} />{' '}
          {saved
            ? 'Saved to your account'
            : signedIn
              ? 'Account changes save when you choose'
              : 'Local draft · kept for 7 days'}
        </span>
      </div>
      {serverCopy && (
        <section
          className="conflict-panel"
          aria-label="Review saved and local choices"
        >
          <h2>Two lists, one decision.</h2>
          <p>
            You have a saved account list and a local draft. Review both before
            choosing which to continue.
          </p>
          <div className="compare-grid">
            <div>
              <h3>Current draft</h3>
              <FiveSummary intake={intake} />
              <p className="small-copy">
                {intake.scene
                  ? 'Includes your current private scene.'
                  : 'No private scene.'}
              </p>
            </div>
            <div>
              <h3>Saved account list</h3>
              <FiveSummary intake={serverCopy} />
              <p className="small-copy">
                {serverCopy.scene
                  ? 'Includes a saved private scene.'
                  : 'No private scene.'}
              </p>
            </div>
          </div>
          <div className="action-row">
            <Button
              className="primary-action"
              onClick={() => {
                setRevision(serverCopy.revision);
                setServerCopy(null);
                setMessage(
                  'Your draft is ready to edit. Review and save when you are ready to replace the account list.',
                );
              }}
            >
              Continue my current draft
            </Button>
            <Button
              variant="outline"
              className="secondary-action"
              onClick={() => {
                setIntake(serverCopy);
                setRevision(serverCopy.revision);
                setServerCopy(null);
                setStep(7);
                setMessage('Loaded your saved list.');
              }}
            >
              Use my saved list
            </Button>
          </div>
        </section>
      )}
      <div className="intake-layout">
        <aside className="intake-sidebar">
          <p className="eyebrow">YOUR FIVE POSSIBILITIES</p>
          <ol>
            {categories.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => move(i)}
                  aria-current={step === i ? 'step' : undefined}
                >
                  <span
                    style={{ background: step === i ? c.color : undefined }}
                  >
                    {intake.choices[c.id] ? (
                      <Check size={15} />
                    ) : (
                      String(i + 1).padStart(2, '0')
                    )}
                  </span>
                  {c.name}
                </button>
              </li>
            ))}
          </ol>
          <p>
            This is a list of possibilities.
            <br />
            You’ll begin with just one.
          </p>
        </aside>
        <section className="intake-main" key={step}>
          {step < 5 ? (
            <>
              <p className="eyebrow">
                {category.name.toUpperCase()} · CATEGORY {step + 1} OF 5
              </p>
              <h1 ref={heading} tabIndex={-1}>
                {category.cue}
              </h1>
              <p className="page-intro">
                {category.description} Choose the one that speaks to you.
              </p>
              <RadioGroup
                value={intake.choices[category.id] ?? ''}
                onValueChange={(v) => choose(String(v))}
                aria-label={`Your ${category.name} possibility`}
              >
                {[
                  ...category.options,
                  {
                    id: 'none',
                    title: 'Nothing here yet',
                    detail: 'Leave a little space. You can come back to this.',
                  },
                ].map((o) => (
                  <label
                    htmlFor={`choice-${category.id}-${o.id}`}
                    className={`choice-card ${intake.choices[category.id] === o.id ? 'is-selected' : ''}`}
                    key={o.id}
                  >
                    <RadioGroupItem
                      id={`choice-${category.id}-${o.id}`}
                      value={o.id}
                    />
                    <span>
                      <strong>{o.title}</strong>
                      <span>{o.detail}</span>
                    </span>
                  </label>
                ))}
              </RadioGroup>
              <div className="flow-actions">
                <Button
                  variant="ghost"
                  className="secondary-action"
                  disabled={step === 0}
                  onClick={() => move(step - 1)}
                >
                  <ArrowLeft size={17} /> Back
                </Button>
                <Button
                  className="primary-action"
                  disabled={!intake.choices[category.id]}
                  onClick={() => {
                    const missing = categories.findIndex(
                      (c) => !intake.choices[c.id],
                    );
                    move(step < 4 ? step + 1 : missing >= 0 ? missing : 5);
                  }}
                >
                  Continue <ArrowRight size={17} />
                </Button>
              </div>
            </>
          ) : step === 5 ? (
            <>
              <p className="eyebrow">ONE PLACE TO BEGIN</p>
              <h1 ref={heading} tabIndex={-1}>
                {selected.length
                  ? 'Which one would you like to start with?'
                  : 'It’s okay to leave some room.'}
              </h1>
              <p className="page-intro">
                {selected.length
                  ? 'Your other possibilities stay on your list. This is just the one you want to make space for first.'
                  : 'You chose “Nothing here yet” in all five categories. You can keep this list and browse whenever you feel curious.'}
              </p>
              {selected.length > 0 && (
                <RadioGroup
                  value={intake.active ?? ''}
                  onValueChange={(v) => {
                    setIntake({ ...intake, active: String(v) });
                    setSaved(false);
                  }}
                  aria-label="Your starting choice"
                >
                  {selected.map((id) => (
                    <label
                      key={id}
                      className={`choice-card ${intake.active === id ? 'is-selected' : ''}`}
                    >
                      <RadioGroupItem id={`start-${id}`} value={id} />
                      <strong>{findOption(id)?.title}</strong>
                    </label>
                  ))}
                </RadioGroup>
              )}
              <div className="flow-actions">
                <Button
                  variant="ghost"
                  className="secondary-action"
                  onClick={() => move(4)}
                >
                  <ArrowLeft size={17} /> Back
                </Button>
                <Button
                  className="primary-action"
                  disabled={selected.length > 0 && !intake.active}
                  onClick={() => move(6)}
                >
                  Continue <ArrowRight size={17} />
                </Button>
              </div>
            </>
          ) : step === 6 ? (
            <>
              <p className="eyebrow">A LITTLE SPACE TO IMAGINE · OPTIONAL</p>
              <h1 ref={heading} tabIndex={-1}>
                What’s the one scene you picture?
              </h1>
              <p className="page-intro">
                Maybe your family watching you play. Or hearing your own song,
                finished. There’s no right answer.
              </p>
              <label htmlFor="scene" className="field-label">
                Your scene
              </label>
              <textarea
                id="scene"
                rows={5}
                maxLength={1200}
                value={intake.scene}
                onChange={(e) => {
                  setIntake({ ...intake, scene: e.target.value });
                  setSaved(false);
                }}
                placeholder="I picture myself…"
              />
              <p className="small-copy">
                <LockKeyhole size={14} /> Private to your account when you save.
                A host may use it to prepare your experience. This is not
                permission to share it publicly.
              </p>
              <label className="checkbox-label" htmlFor="save-scene">
                <Checkbox
                  id="save-scene"
                  checked={saveScene}
                  onCheckedChange={(v) => setSaveScene(v === true)}
                />{' '}
                Also keep this scene in my local 7-day draft on this device.
              </label>
              <div className="flow-actions">
                <Button
                  variant="ghost"
                  className="secondary-action"
                  onClick={() => move(5)}
                >
                  <ArrowLeft size={17} /> Back
                </Button>
                <Button className="primary-action" onClick={() => move(7)}>
                  Review my five <ArrowRight size={17} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow">A LITTLE MORE OF YOU</p>
              <h1 ref={heading} tabIndex={-1}>
                Your five.
                <br />
                Your own pace.
              </h1>
              <p className="page-intro">
                Five possibilities, with room to change your mind. Selecting
                them doesn’t reserve or purchase an experience.
              </p>
              <FiveSummary intake={intake} />
              {intake.scene && (
                <div className="scene-review">
                  <LockKeyhole size={16} />
                  <div>
                    <strong>Your private scene</strong>
                    <p>{intake.scene}</p>
                  </div>
                </div>
              )}
              <div className="flow-actions">
                <Button
                  variant="ghost"
                  className="secondary-action"
                  onClick={() => move(5)}
                >
                  Edit starting choice
                </Button>
                {!signedIn ? (
                  <Link className="primary-action" href="/sign-in">
                    Sign in to save <ArrowRight size={17} />
                  </Link>
                ) : (
                  <Button
                    className="primary-action"
                    disabled={busy || !!serverCopy || saved}
                    onClick={() => void save()}
                  >
                    {busy
                      ? 'Saving…'
                      : saved
                        ? 'Saved to your account'
                        : 'Save my five'}
                    {saved ? <Check size={18} /> : <ArrowRight size={18} />}
                  </Button>
                )}
              </div>
              {saved && (
                <Link className="text-action" href="/app">
                  Go to my home <ArrowRight size={18} />
                </Link>
              )}
              <p className="small-copy">
                {signedIn
                  ? 'Account saving lets you resume on another device.'
                  : 'This is a local draft, not an account save. Cross-device saving uses sign-in.'}{' '}
                Changing your five never cancels existing bookings or group
                memberships.
              </p>
            </>
          )}
        </section>
      </div>
      {localError && (
        <p role="alert" className="notice error">
          {localError}
        </p>
      )}
      {message && (
        <div className="notice" role="status">
          {message}
          {!saved && signedIn && (
            <button
              className="text-action"
              onClick={() => void refreshConflict()}
              disabled={busy}
            >
              Review latest saved list
            </button>
          )}
        </div>
      )}
    </main>
  );
}
