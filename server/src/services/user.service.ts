// import { RepositoryFactory } from '@/repositories';
// import { RUser } from '@/repositories/user.repository';

// interface IProps {
//     user: RUser;
// }

// export class SUser {
//     private rUser: RUser;

//     setDependency({ user }: IProps) {
//         this.rUser = user;
//     }

//     async get(id: number) {
//         return await this.rUser.findById(id);
//     }

//     async create(data: any) {
//         console.log('aabbccdd');
//         const newTenant = await RepositoryFactory.createSchema('tenant');
//         if (!newTenant) console.log('111222333444');

//         return await this.rUser.create(data);
//     }
// }
