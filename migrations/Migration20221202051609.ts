import { Migration } from '@mikro-orm/migrations';

export class Migration20221202051609 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `splash_screen_entity` add column `mimetype` text not null;');
  }

}
