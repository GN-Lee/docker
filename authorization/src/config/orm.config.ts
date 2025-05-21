import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'teemo',
  password: 'qwer',
  database: 'auth',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize: true,
};
