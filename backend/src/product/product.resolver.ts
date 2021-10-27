import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/user/user.entity';
import { createProductDto } from './dto/createProductDto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Product])
  findAllProducts(@CurrentUser() user: User): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Mutation((returns) => Product)
  createProduct(
    @Args('createProductDto') createProductDto: createProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }
}
