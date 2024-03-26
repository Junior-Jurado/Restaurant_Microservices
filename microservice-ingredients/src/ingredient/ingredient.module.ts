import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INGREDIENT } from 'src/common/models/models';
import { IngredientSchema } from './schema/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: INGREDIENT.name,
          useFactory: () => IngredientSchema
        }
      ]
    )
  ],
  controllers: [IngredientController],
  providers: [IngredientService]
})
export class IngredientModule {}
