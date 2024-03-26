export enum RabbitMQ {
    RecipeQueue = 'recipes'
}

export enum RecipeMSG {
    CREATE = 'CREATE_RECIPE',
    FIND_ALL = 'FIND_RECIPES',
    FIND_ONE = 'FIND_RECIPE_BY_ID',
    UPDATE = 'UPDATE_RECIPE',
    DELETE = 'DELETE_RECIPE',
    ADD_INGREDIENT = 'ADD_INGREDIENT_TO_RECIPE'
}
