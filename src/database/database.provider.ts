import { Sequelize } from 'sequelize-typescript';
import { dataBaseConfig } from './config';
import { entities } from './entities/entities';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config:any;

      switch (process.env.NODE_ENV) {
        case 'development':
          config = dataBaseConfig.development;
          break;
        case 'test':
          config = dataBaseConfig.test;
          break;
        case 'production':
          config = dataBaseConfig.production;
          break;
        default:
          config = dataBaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels(entities);

      await sequelize.sync();
      return sequelize;
    },
  },
];
