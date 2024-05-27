CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`context` text NOT NULL,
	`done` integer DEFAULT 0
);
