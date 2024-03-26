import { Module } from "@nestjs/common";
import { ClientProxyRestaurant } from "./client-proxy";

@Module({
    providers: [ClientProxyRestaurant],
    exports: [ClientProxyRestaurant]
})
export class ProxyModule {}