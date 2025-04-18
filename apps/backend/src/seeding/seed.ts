import dbConfig from '../config/db.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UserFactory } from './user.factory';
import { MainSeeder } from './main.seeder';
import { ItemFactory } from './items.factory';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [UserFactory, ItemFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  // console.log('DB URL:', process.env.url);
  // console.log('DB PORT:', process.env.D);
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
