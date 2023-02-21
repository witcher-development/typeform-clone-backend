import { Migration } from '@mikro-orm/migrations';

export class Migration20230220115951 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "question" ("id" varchar(255) not null, "name" varchar(255) not null, "survey_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "question_pkey" primary key ("id"));');

    this.addSql('alter table "question" add constraint "question_survey_id_foreign" foreign key ("survey_id") references "survey" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "question" cascade;');
  }

}
