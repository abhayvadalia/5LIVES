ALTER TABLE `launch_requests` ADD `consent_updated_at` text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE INDEX `idx_launch_requests_created_at` ON `launch_requests` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_request_limits_window` ON `request_limits` (`window`);