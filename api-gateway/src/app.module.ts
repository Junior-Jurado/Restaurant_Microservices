import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [
    ConfigModule.forRoot(
    {
      envFilePath:['.env.development'],
      isGlobal: true,
    }
  ),
  MongooseModule.forRoot(process.env.URI_MONGODB),
  OrderModule,
  RecipeModule,
  IngredientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
