import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER } from 'src/common/models/models';
import { OrderSchema } from './schema/order.schema';
import { RecipeModule } from 'src/recipe/recipe.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
    imports:[
        ProxyModule,
        MongooseModule.forFeatureAsync([
            {
                name: ORDER.name,
                useFactory: () => OrderSchema.plugin(require
                    ('mongoose-autopopulate'))
            },
        ]),
        RecipeModule
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
