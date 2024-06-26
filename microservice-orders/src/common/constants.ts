export enum RabbitMQ {
    OrderQueue = 'orders'
}

export enum OrderMSG{
    CREATE = 'CREATE_ORDER',
    FIND_ALL = 'FIND_ORDERS',
    FIND_ONE = 'FIND_ORDER',
    FIND_NUMBER_ORDER = 'FIND_NUMBER_ORDER',
    UPDATE = 'UPDATE_ORDER',
    DELETE = 'DELETE_ORDER',
    DELETE_ALL = 'DELETE_ALL_ORDER',
    NOT_DELIVERED = 'NOT_DELIVERED_ORDERS',
    DELIVERED = 'DELIVERED_ORDERS'
}