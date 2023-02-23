declare global {
  type Primitive = string | number | symbol

  type Obj = Record<Primitive, unknown>
  type ObjectOf<T> = Record<Primitive, T>

  type ObjectType = Obj | Record<never, never>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyFn = (...args: any) => any

  type Entry<T> = {
    [K in keyof T]: [K, T[K]]
  }[keyof T]

  type Join<L extends Primitive | undefined, R extends Primitive | undefined> = L extends string | number
    ? R extends string | number
      ? `${L}.${R}`
      : L
    : R extends string | number
    ? R
    : undefined

  type Union<L extends unknown | undefined, R extends unknown | undefined> = L extends undefined
    ? R extends undefined
      ? undefined
      : R
    : R extends undefined
    ? L
    : L | R

  type Rename<T, U> = {
    [K in keyof U as K extends keyof T ? (T[K] extends string ? T[K] : never) : K]: K extends keyof U ? U[K] : never
  }

  /**
   * NestedPaths
   * Get all the possible paths of an object
   * @example
   * type Keys = NestedPaths<{ a: { b: { c: string } }>
   * // 'a' | 'a.b' | 'a.b.c'
   */
  type NestedPaths<
    T extends Obj,
    Prev extends Primitive | undefined = undefined,
    Path extends Primitive | undefined = undefined
  > = {
    [K in keyof T]: T[K] extends Obj
      ? NestedPaths<T[K], Union<Prev, Path>, Join<Path, K>>
      : Union<Union<Prev, Path>, Join<Path, K>>
  }[keyof T]

  /**
   * TypeFromPath
   * Get the type of the element specified by the path
   * @example
   * type TypeOfAB = TypeFromPath<{ a: { b: { c: string } }, 'a.b'>
   * // { c: string }
   */
  type TypeFromPath<
    T extends Obj,
    Path extends string // Or, if you prefer, NestedPaths<T>
  > = {
    [K in Path]: K extends keyof T
      ? T[K]
      : K extends `${infer P}.${infer S}`
      ? T[P] extends Obj
        ? TypeFromPath<T[P], S>
        : never
      : never
  }[Path]

  type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S

  type SnakeToCamelCaseObjKeys<T> = T extends object
    ? {
        [K in keyof T as SnakeToCamelCase<K & string>]: T[K]
      }
    : T

  type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S

  type CamelToSnakeCaseObjKeys<T> = T extends object
    ? {
        [K in keyof T as CamelToSnakeCase<K & string>]: T[K]
      }
    : T

  type AsConstEnum<T> = {
    [K in keyof T]: K
  }
}

export {}
