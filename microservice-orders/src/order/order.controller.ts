import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderMSG } from "src/common/constants";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class OrderController {

    constructor(private readonly orderService: OrderService) {
    }

    @MessagePattern(OrderMSG.CREATE)
    create(@Payload() payload) {
        return this.orderService.create(payload.orderDTO, payload.recipeAleatory)
    }

    @MessagePattern(OrderMSG.FIND_ALL)
    findAll() {
        return this.orderService.findAll();
    }

    @MessagePattern(OrderMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.orderService.findOne(id);
    }

    @MessagePattern(OrderMSG.FIND_NUMBER_ORDER)
    findNumberOrder(@Payload() numberOrder) {
        return this.orderService.findNumberOrder(numberOrder);
    }

    @MessagePattern(OrderMSG.NOT_DELIVERED)
    findNotDelivered() {
        return this.orderService.findOrdersNotDelivered();
    }

    @MessagePattern(OrderMSG.DELIVERED)
    findDelivered() {
        return this.orderService.findOrdersDelivered();
    }

    @MessagePattern(OrderMSG.UPDATE)
    update(@Payload() payload) {
        return this.orderService.update(payload.id, payload.orderDTO);
    }

    @MessagePattern(OrderMSG.DELETE)
    delete(@Payload() id: string) {
        return this.orderService.delete(id)
    }

    @MessagePattern(OrderMSG.DELETE_ALL)
    deleteAll() {
        return this.orderService.deleteAll();
    }


}
