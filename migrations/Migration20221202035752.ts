import { Migration } from '@mikro-orm/migrations';

export class Migration20221202035752 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `splash_screen_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `name` text not null, `path_file` text not null);');
  }

}
