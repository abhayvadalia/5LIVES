import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';
export const profiles = sqliteTable('profiles', {
  userId: text('user_id').primaryKey(),
  choices: text('choices').notNull(),
  active: text('active'),
  scene: text('scene').notNull().default(''),
  revision: integer('revision').notNull().default(1),
  updatedAt: text('updated_at').notNull(),
});
export const interests = sqliteTable(
  'interests',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    optionId: text('option_id').notNull(),
    city: text('city').notNull(),
    cityKey: text('city_key').notNull(),
    availability: text('availability').notNull(),
    status: text('status', { enum: ['requested', 'reviewing', 'withdrawn'] })
      .notNull()
      .default('requested'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (t) => [
    uniqueIndex('idx_interests_user_option_city').on(
      t.userId,
      t.optionId,
      t.cityKey,
    ),
  ],
);
export const operators = sqliteTable('operators', {
  userId: text('user_id').primaryKey(),
  role: text('role', { enum: ['owner', 'operator'] }).notNull(),
});
export const audit = sqliteTable('audit', {
  id: text('id').primaryKey(),
  actorId: text('actor_id').notNull(),
  action: text('action').notNull(),
  subjectId: text('subject_id').notNull(),
  createdAt: text('created_at').notNull(),
});

// Pre-launch requests are separate from paid membership and newsletter consent.
export const launchRequests = sqliteTable(
  'launch_requests',
  {
    id: text('id').primaryKey(),
    tokenHash: text('token_hash').notNull(),
    kind: text('kind').notNull(),
    subject: text('subject').notNull(),
    email: text('email').notNull(),
    city: text('city').notNull(),
    expectedPrice: text('expected_price').notNull().default(''),
    consentUpdates: integer('consent_updates').notNull().default(0),
    consentVersion: text('consent_version').notNull(),
    consentUpdatedAt: text('consent_updated_at').notNull().default(''),
    source: text('source').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (t) => [index('idx_launch_requests_created_at').on(t.createdAt)],
);
export const requestLimits = sqliteTable(
  'request_limits',
  {
    key: text('key').primaryKey(),
    window: integer('window').notNull(),
    count: integer('count').notNull(),
  },
  (t) => [index('idx_request_limits_window').on(t.window)],
);
