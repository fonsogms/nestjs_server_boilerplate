import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig = (): TypeOrmModuleOptions => {
  if (!process.env.DEVELOPMENT) {
    console.log('livign the dream');
    return {
      type: 'postgres',
      host: 'localhost',
      //keepConnectionAlive: true,
      port: 5433,
      username: 'postgres',
      password: 'tito-1992',
      database: 'test',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  } else {
    return {
      type: 'postgres',
      host: '18.223.115.106',
      //keepConnectionAlive: true,
      port: 5432,
      username: 'postgres',
      password: 'tito-1992',
      database: 'newsGetter',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  }
};
