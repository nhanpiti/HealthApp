import { Migration } from '@mikro-orm/migrations';

export class Migration20221202080347 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `customer_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `country_code` integer not null, `name` text not null, `phone_number` text not null);');

    this.addSql('create table `exercise_posture_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `name` text not null);');

    this.addSql('create table `exercise_type_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `name` text not null, `image` text not null);');

    this.addSql('create table `meal_type_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `name` text not null, `image` text not null);');

    this.addSql('create table `personal_profile_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `calorie_unit` text not null, `weight_unit` text not null, `customer_id` integer not null, constraint `personal_profile_entity_customer_id_foreign` foreign key(`customer_id`) references `customer_entity`(`id`) on update cascade);');
    this.addSql('create index `personal_profile_entity_customer_id_index` on `personal_profile_entity` (`customer_id`);');

    this.addSql('create table `meal_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `meal_type_id` integer not null, `image` text not null, `personal_profile_id` integer not null, constraint `meal_entity_meal_type_id_foreign` foreign key(`meal_type_id`) references `meal_type_entity`(`id`) on update cascade, constraint `meal_entity_personal_profile_id_foreign` foreign key(`personal_profile_id`) references `personal_profile_entity`(`id`) on update cascade);');
    this.addSql('create index `meal_entity_meal_type_id_index` on `meal_entity` (`meal_type_id`);');
    this.addSql('create index `meal_entity_personal_profile_id_index` on `meal_entity` (`personal_profile_id`);');

    this.addSql('create table `health_indicator_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `personal_profile_id` integer not null, `weight` integer not null, `fat_ratio` integer not null, constraint `health_indicator_entity_personal_profile_id_foreign` foreign key(`personal_profile_id`) references `personal_profile_entity`(`id`) on update cascade);');
    this.addSql('create index `health_indicator_entity_personal_profile_id_index` on `health_indicator_entity` (`personal_profile_id`);');

    this.addSql('create table `exercise_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `exercise_type_id` integer not null, `calories_burn` integer not null, `personal_profile_id` integer not null, constraint `exercise_entity_exercise_type_id_foreign` foreign key(`exercise_type_id`) references `exercise_type_entity`(`id`) on update cascade, constraint `exercise_entity_personal_profile_id_foreign` foreign key(`personal_profile_id`) references `personal_profile_entity`(`id`) on update cascade);');
    this.addSql('create index `exercise_entity_exercise_type_id_index` on `exercise_entity` (`exercise_type_id`);');
    this.addSql('create index `exercise_entity_personal_profile_id_index` on `exercise_entity` (`personal_profile_id`);');

    this.addSql('create table `exercise_posture_entity_exercises` (`id` integer not null primary key autoincrement, `exercise_posture_entity_id` integer not null, `exercise_entity_id` integer not null, constraint `exercise_posture_entity_exercises_exercise_posture_entity_id_foreign` foreign key(`exercise_posture_entity_id`) references `exercise_posture_entity`(`id`) on delete cascade on update cascade, constraint `exercise_posture_entity_exercises_exercise_entity_id_foreign` foreign key(`exercise_entity_id`) references `exercise_entity`(`id`) on delete cascade on update cascade);');
    this.addSql('create index `exercise_posture_entity_exercises_exercise_posture_entity_id_index` on `exercise_posture_entity_exercises` (`exercise_posture_entity_id`);');
    this.addSql('create index `exercise_posture_entity_exercises_exercise_entity_id_index` on `exercise_posture_entity_exercises` (`exercise_entity_id`);');

    this.addSql('create table `exercise_entity_postures` (`id` integer not null primary key autoincrement, `exercise_entity_id` integer not null, `exercise_posture_entity_id` integer not null, constraint `exercise_entity_postures_exercise_entity_id_foreign` foreign key(`exercise_entity_id`) references `exercise_entity`(`id`) on delete cascade on update cascade, constraint `exercise_entity_postures_exercise_posture_entity_id_foreign` foreign key(`exercise_posture_entity_id`) references `exercise_posture_entity`(`id`) on delete cascade on update cascade);');
    this.addSql('create index `exercise_entity_postures_exercise_entity_id_index` on `exercise_entity_postures` (`exercise_entity_id`);');
    this.addSql('create index `exercise_entity_postures_exercise_posture_entity_id_index` on `exercise_entity_postures` (`exercise_posture_entity_id`);');

    this.addSql('create table `diary_notebook_entity` (`id` integer not null primary key autoincrement, `created_time` datetime not null, `personal_profile_id` integer not null, `title` text not null, `description` text not null, constraint `diary_notebook_entity_personal_profile_id_foreign` foreign key(`personal_profile_id`) references `personal_profile_entity`(`id`) on update cascade);');
    this.addSql('create index `diary_notebook_entity_personal_profile_id_index` on `diary_notebook_entity` (`personal_profile_id`);');
  }

}
