CREATE TABLE `cartItems` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64),
	`sessionId` varchar(64),
	`productId` varchar(64) NOT NULL,
	`quantity` varchar(10) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `cartItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `muralRequests` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`location` text,
	`wallSize` varchar(100),
	`wallCondition` text,
	`theme` text,
	`inspiration` text,
	`timeline` varchar(100),
	`budget` varchar(100),
	`additionalNotes` text,
	`status` enum('new','reviewed','quoted','in-progress','completed') DEFAULT 'new',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `muralRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscriptions` (
	`id` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`status` enum('subscribed','unsubscribed') DEFAULT 'subscribed',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `newsletterSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscriptions_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64),
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`totalPrice` varchar(50) NOT NULL,
	`status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolioItems` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`imageUrl` text,
	`imageUrls` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `portfolioItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`price` varchar(50) NOT NULL,
	`imageUrl` text,
	`imageUrls` text,
	`isOneOfOne` varchar(10) DEFAULT 'true',
	`stock` varchar(10) DEFAULT '1',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workshopTickets` (
	`id` varchar(64) NOT NULL,
	`workshopId` varchar(64) NOT NULL,
	`userId` varchar(64),
	`email` varchar(320) NOT NULL,
	`name` varchar(255) NOT NULL,
	`quantity` varchar(10) NOT NULL,
	`totalPrice` varchar(50),
	`status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `workshopTickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workshops` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`date` timestamp NOT NULL,
	`time` varchar(10),
	`location` varchar(255),
	`price` varchar(50),
	`capacity` varchar(50),
	`imageUrl` text,
	`qrCode` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `workshops_id` PRIMARY KEY(`id`)
);
