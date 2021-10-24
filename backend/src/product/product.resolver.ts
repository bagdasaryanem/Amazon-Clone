import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createProductDto } from './dto/createProductDto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}
  @Query((returns) => [Product])
  findAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Mutation((returns) => Product)
  createProduct(
    @Args('createProductDto') createProductDto: createProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }
}
