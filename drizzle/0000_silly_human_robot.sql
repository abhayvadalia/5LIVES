CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`action` text NOT NULL,
	`subject_id` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `interests` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`option_id` text NOT NULL,
	`city` text NOT NULL,
	`city_key` text NOT NULL,
	`availability` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_interests_user_option_city` ON `interests` (`user_id`,`option_id`,`city_key`);--> statement-breakpoint
CREATE TABLE `operators` (
	`user_id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`choices` text NOT NULL,
	`active` text,
	`scene` text DEFAULT '' NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL
);
