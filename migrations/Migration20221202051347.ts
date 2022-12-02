import { Migration } from '@mikro-orm/migrations';

export class Migration20221202051347 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `splash_screen_entity` rename column `path_file` to `file_name`;');
  }

}
