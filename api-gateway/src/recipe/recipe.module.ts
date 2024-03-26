import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RECIPE } from 'src/common/models/models';
import { RecipeSchema } from './schema/recipe.schema';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports:[
    ProxyModule,
    MongooseModule.forFeatureAsync([
      {
        name: RECIPE.name,
        useFactory: () => RecipeSchema.plugin(require
          ('mongoose-autopopulate'))
      },
    ]), 
    IngredientModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService]
})
export class RecipeModule {}
