import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INGREDIENT } from 'src/common/models/models';
import { IngredientSchema } from './schema/ingredient.schema';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [
    ProxyModule,
    MongooseModule.forFeatureAsync([
      {
        name: INGREDIENT.name,
        useFactory: () => IngredientSchema,
      },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
