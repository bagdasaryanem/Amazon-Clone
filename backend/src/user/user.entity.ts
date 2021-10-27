import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './types/user-role.enum';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column()
  email: string;

  @Field(() => UserRole)
  @Column({ default: UserRole.customer })
  role: UserRole;

  @Field()
  @Column()
  password: string;
}
