import { Migration } from '@mikro-orm/migrations';

export class Migration20230220202008 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "question" add column "content_type" text check ("content_type" in (\'string\', \'number\', \'multi-select\', \'matrix\')) not null, add column "content_options" jsonb null;');
    this.addSql('create index "question_content_type_index" on "question" ("content_type");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "question_content_type_index";');
    this.addSql('alter table "question" drop column "content_type";');
    this.addSql('alter table "question" drop column "content_options";');
  }

}
