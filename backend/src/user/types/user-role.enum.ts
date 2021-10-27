import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  admin,
  customer,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
