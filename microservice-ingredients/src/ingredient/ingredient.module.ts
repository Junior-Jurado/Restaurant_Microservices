import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INGREDIENT, SHOPPING_HISTORY } from 'src/common/models/models';
import { IngredientSchema, ShoppingHistorySchema } from './schema/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: INGREDIENT.name,
          useFactory: () => IngredientSchema
        },
        {
          name: SHOPPING_HISTORY.name,
          useFactory: () => ShoppingHistorySchema
        },
      ]
    )
  ],
  controllers: [IngredientController],
  providers: [IngredientService]
})
export class IngredientModule {}
