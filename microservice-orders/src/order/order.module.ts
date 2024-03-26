import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER, RECIPE } from 'src/common/models/models';
import { OrderSchema } from './schema/order.schema';
import { RecipeSchema } from './schema/recipe.schema';

@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: ORDER.name,
                useFactory: () => OrderSchema.plugin(require
                    ('mongoose-autopopulate'))
            },
            {
                name: RECIPE.name,
                useFactory: () => RecipeSchema,
            },
        ])
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
