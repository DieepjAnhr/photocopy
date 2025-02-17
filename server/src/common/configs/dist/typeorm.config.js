"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = function (configService) { return ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST', 'localhost'),
    port: configService.get('DATABASE_PORT', 5432),
    username: configService.get('DATABASE_USER', 'admin'),
    password: configService.get('DATABASE_PASSWORD', 'abcd1234!@#$'),
    database: configService.get('DATABASE_NAME', 'photocopy'),
    schema: 'public',
    entities: ['dist/**/*.entity.js'],
    autoLoadEntities: true,
    dropSchema: false,
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('LOGGING', false)
}); };
