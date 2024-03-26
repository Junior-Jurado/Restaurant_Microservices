export enum RabbitMQ {
    OrderQueue = 'orders'
}

export enum OrderMSG{
    CREATE = 'CREATE_ORDER',
    FIND_ALL = 'FIND_ORDERS',
    FIND_ONE = 'FIND_ORDER',
    UPDATE = 'UPDATE_ORDER',
    DELETE = 'DELETE_ORDER'
}