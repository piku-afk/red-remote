import type { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('rooms')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(db.fn('gen_random_uuid')))
    .addColumn('room_code', 'text', (col) => col.notNull().unique())
    .addColumn('owner_fingerprint_id', 'uuid', (col) =>
      col.notNull().references('browser_fingerprints.id').onDelete('cascade')
    )
    .addColumn('is_active', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('max_participants', 'integer', (col) => col.notNull().defaultTo(10))
    .addColumn('auto_approve', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('expires_at', 'timestamptz')
    .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo(db.fn('now')))
    .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo(db.fn('now')))
    .execute();

  await db.schema
    .createIndex('idx_rooms_owner')
    .on('rooms')
    .column('owner_fingerprint_id')
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('idx_rooms_owner').ifExists().execute();
  await db.schema.dropTable('rooms').ifExists().execute();
}
