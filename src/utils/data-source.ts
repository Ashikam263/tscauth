// require('dotenv').config();
// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import config from 'config';

// const postgresConfig = config.get<{
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
// }>('postgresConfig');

// export const AppDataSource = new DataSource({
//   ...postgresConfig,
//   type: 'postgres',
//   synchronize: false,
//   logging: false,
//   entities: ['src/entities/**/*.entity{.ts,.js}'],
//   migrations: ['src/migrations/**/*{.ts,.js}'],
//   subscribers: ['src/subscribers/**/*{.ts,.js}'],
// });

import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/user.entity"


const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: NODE_ENV === "development" ? true : false,
    logging: NODE_ENV === "development" ? false : false,
    entities: [User,],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
})