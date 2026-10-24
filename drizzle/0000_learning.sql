CREATE TABLE `content` (
 `id` text PRIMARY KEY NOT NULL,
 `data` text NOT NULL,
 `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `learner_state` (
 `user_id` text PRIMARY KEY NOT NULL,
 `data` text NOT NULL,
 `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roles` (
 `user_id` text PRIMARY KEY NOT NULL,
 `role` text NOT NULL
);
