import { sqliteTable, text, primaryKey, integer } from "drizzle-orm/sqlite-core";
export const learnerState = sqliteTable("learner_state", {
 userId: text("user_id").primaryKey(), data: text("data").notNull(), updatedAt: text("updated_at").notNull()
});
export const content = sqliteTable("content", {id:text("id").primaryKey(), data:text("data").notNull(), updatedAt:text("updated_at").notNull()});
export const roles = sqliteTable("roles", {userId:text("user_id").primaryKey(), role:text("role").notNull()});
export const speechUsage = sqliteTable("speech_usage", {id:text("id").primaryKey(),count:integer("count").notNull()});
export const aiUsage = sqliteTable("ai_usage", {id:text("id").primaryKey(),count:integer("count").notNull()});

