/* eslint-disable */
import { DataSource } from 'typeorm';
const path = require('path'); // eslint-disable-line

const envConfig = require('dotenv').config({
    path: `${process.env.NODE_ENV
        ? path.resolve(__dirname, `../${process.env.NODE_ENV}.env`)
        : path.resolve(__dirname, '../development.env')
        }`,
});
if (envConfig.error) {
    throw envConfig.error;
}

function env(key: any) {
    return envConfig[key] || process.env[key];
}

const AppDataSource = new DataSource({
    type: 'postgres',
    host: env('DB_CONNECTION_HOST'),
    port: env('DB_CONNECTION_PORT'),
    username: env('DB_CONNECTION_USERNAME'),
    password: env('DB_CONNECTION_PASSWORD'),
    database: env('DB_CONNECTION_DATABASE'),
    logging: true,
    name: 'default',
    synchronize: false,
    migrationsTableName: 'migrations',
    entities: [path.join(__dirname, '../src/**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../database/migrations/**/*.ts')],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

export default AppDataSource;
