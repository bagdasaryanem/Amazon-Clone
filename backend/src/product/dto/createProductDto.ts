import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createProductDto {
  @Field()
  name: string;

  @Field()
  price: number;
}
