export enum RabbitMQ {
    IngredientQueue = 'ingredients'
}

export enum IngredientMSG{
    CREATE = 'CREATE_INGREDIENT',
    FIND_ALL = 'FIND_INGREDIENTS',
    FIND_ONE = 'FIND_INGREDIENT',
    UPDATE = 'UPDATE_INGREDIENT',
    DELETE = 'DELETE_INGREDIENT',
    FIND_ONE_BY_NAME = 'FIND_INGREDIENTE_BY_NAME'
}
