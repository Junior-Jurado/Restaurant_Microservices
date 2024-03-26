export enum RabbitMQ {
    OrderQueue = 'orders',
    IngredientQueue = 'ingredients',
    RecipeQueue = 'recipes'
}

export enum IngredientMSG{
    CREATE = 'CREATE_INGREDIENT',
    FIND_ALL = 'FIND_INGREDIENTS',
    FIND_ONE = 'FIND_INGREDIENT',
    UPDATE = 'UPDATE_INGREDIENT',
    DELETE = 'DELETE_INGREDIENT',
    FIND_ONE_BY_NAME = 'FIND_INGREDIENTE_BY_NAME'
}

export enum RecipeMSG {
    CREATE = 'CREATE_RECIPE',
    FIND_ALL = 'FIND_RECIPES',
    FIND_ONE = 'FIND_RECIPE_BY_ID',
    UPDATE = 'UPDATE_RECIPE',
    DELETE = 'DELETE_RECIPE',
    ADD_INGREDIENT = 'ADD_INGREDIENT_TO_RECIPE',
    FIND_ONE_RANDOM = 'FIND_RECIPE_RANDOM',
    COOK = 'COOK RECIPE'
}

export enum OrderMSG{
    CREATE = 'CREATE_ORDER',
    FIND_ALL = 'FIND_ORDERS',
    FIND_ONE = 'FIND_ORDER',
    UPDATE = 'UPDATE_ORDER',
    DELETE = 'DELETE_ORDER'
}