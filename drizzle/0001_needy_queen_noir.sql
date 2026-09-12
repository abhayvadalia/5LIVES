CREATE TABLE `launch_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`kind` text NOT NULL,
	`subject` text NOT NULL,
	`email` text NOT NULL,
	`city` text NOT NULL,
	`expected_price` text DEFAULT '' NOT NULL,
	`consent_updates` integer DEFAULT 0 NOT NULL,
	`consent_version` text NOT NULL,
	`source` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `request_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`window` integer NOT NULL,
	`count` integer NOT NULL
);
