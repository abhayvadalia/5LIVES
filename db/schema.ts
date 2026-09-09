import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
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
