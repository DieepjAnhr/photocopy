// import { Sequelize } from 'sequelize';
// // import sequelize from '@/configs/database';
// import { RoleModel } from '@/models/role.model';
// import { UserModel } from '@/models/user.model';

// export class ModelFactory {
//     private sequelize: Sequelize;
//     private schema: string;

//     constructor(sequelize: Sequelize, schema: string) {
//         this.sequelize = sequelize;
//         this.schema = schema;
//     }

//     initModels() {
//         const User = new UserModel(this.sequelize, this.schema).initModel();
//         const Role = new RoleModel(this.sequelize, this.schema).initModel();

//         User.associate({ Role });

//         return { User, Role };
//     }
// }
