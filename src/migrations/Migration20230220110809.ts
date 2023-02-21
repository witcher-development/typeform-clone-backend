import { Migration } from '@mikro-orm/migrations';

export class Migration20230220110809 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "survey" ("id" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "survey_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "survey" cascade;');
  }

}
