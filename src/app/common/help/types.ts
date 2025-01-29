export type PickKeyByType<Type, KeyType> = keyof { [Key in keyof Type as Type[Key] extends KeyType ? Key : never]: Key };
