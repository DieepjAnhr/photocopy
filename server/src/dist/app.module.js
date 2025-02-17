"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var apollo_1 = require("@nestjs/apollo");
var user_module_1 = require("./modules/users/user.module");
var role_module_1 = require("./modules/roles/role.module");
var dataloader_module_1 = require("./common/dataloader/dataloader.module");
var dataloader_service_1 = require("./common/dataloader/dataloader.service");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var permission_module_1 = require("./modules/permissions/permission.module");
var env_helper_1 = require("./common/helpers/env.helper");
var env_validation_1 = require("./common/helpers/env.validation");
var logger_module_1 = require("./common/logger/logger.module");
var auth_module_1 = require("./modules/auth/auth.module");
var blog_module_1 = require("./modules/blogs/blog.module");
var category_module_1 = require("./modules/categories/category.module");
var product_module_1 = require("./modules/products/product.module");
var order_module_1 = require("./modules/orders/order.module");
var file_upload_module_1 = require("./modules/file-uploads/file-upload.module");
var order_detail_module_1 = require("./modules/order-details/order-detail.module");
var attribute_module_1 = require("./modules/attributes/attribute.module");
var variant_module_1 = require("./modules/variants/variant.module");
var appointment_module_1 = require("./modules/appointment/appointment.module");
var typeorm_config_1 = require("./common/configs/typeorm.config");
var graphql_config_1 = require("./common/configs/graphql.config");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: env_helper_1.getEnvPath(__dirname + "/.."),
                    isGlobal: true,
                    validate: env_validation_1.envValidation
                }),
                graphql_1.GraphQLModule.forRootAsync({
                    driver: apollo_1.ApolloDriver,
                    imports: [dataloader_module_1.DataloaderModule],
                    inject: [dataloader_service_1.DataloaderService, config_1.ConfigService],
                    useFactory: function (dataloaderService, configService) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, graphql_config_1.graphqlConfig(dataloaderService, configService)];
                    }); }); }
                }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: typeorm_config_1.typeOrmConfig
                }),
                logger_module_1.LoggerModule,
                auth_module_1.AuthModule,
                blog_module_1.BlogModule,
                category_module_1.CategoryModule,
                permission_module_1.PermissionModule,
                role_module_1.RoleModule,
                user_module_1.UserModule,
                product_module_1.ProductModule,
                attribute_module_1.AttributeModule,
                variant_module_1.VariantModule,
                order_module_1.OrderModule,
                file_upload_module_1.FileUploadModule,
                order_detail_module_1.OrderDetailModule,
                appointment_module_1.AppointmentModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
