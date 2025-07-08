import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('browser_fingerprints')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(db.fn('gen_random_uuid')))
    .addColumn('fingerprint_hash', 'text', (col) => col.notNull().unique())
    .addColumn('fingerprint_version', 'text', (col) => col.notNull())
    .addColumn('raw_fingerprint', 'jsonb', (col) => col.notNull())
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('first_seen', 'timestamptz', (col) => col.notNull().defaultTo(db.fn('now')))
    .addColumn('last_seen', 'timestamptz')
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(db.fn('now')))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(db.fn('now')))
    .addColumn('user_agent', 'text')
    .execute();

  await db.schema
    .createIndex('idx_browser_fingerprints_active_last_seen')
    .on('browser_fingerprints')
    .columns(['is_active', 'last_seen'])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('idx_browser_fingerprints_active_last_seen').ifExists().execute();
  await db.schema.dropTable('browser_fingerprints').ifExists().execute();
}
