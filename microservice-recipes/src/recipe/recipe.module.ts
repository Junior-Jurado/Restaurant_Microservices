import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { INGREDIENT, RECIPE } from 'src/common/models/models';
import { RecipeSchema } from './schema/recipe.schema';


@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: RECIPE.name,
        useFactory: () => RecipeSchema.plugin(require
          ('mongoose-autopopulate'))
      },
      {
        name: INGREDIENT.name,
        useFactory: () => RecipeSchema
      },
    ]), 
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
