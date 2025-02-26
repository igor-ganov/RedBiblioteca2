export function log<T>(value: T) {
  console.log(value);
  return value;
}

export function errorAlert(error: string | Error) {
  console.error(error);
}

export function sendInfo(message: string) {
  console.info(message);
}

export function errorThrow<T>(error: string | Error): T {
  if (typeof error == 'string') {
    throw new Error(error);
  } else {
    throw error;
  }
}

export function getMapValue<TKey, TValue>(map: Map<TKey, TValue>, key: TKey) {
  const value = map.get(key);
  if (value === undefined || value === null) {
    errorThrow(`key ${JSON.stringify(key)} wasn't found in map with keys: ${JSON.stringify(Array.from(map.keys()))}`);
  }
  return value!;
}

export function getValue<T>(value: T | undefined, propertyName: string) {
  if (value === undefined || value === null) {
    errorThrow(`value of selected property ${propertyName} is null`);
  }
  return value!;
}

export function getElementTypeName<T>(value: T): string {
  return typeof value;
}

//can't copy inner array, maps
export function simpleFieldClone<TSrc, TDst>(
  src: TSrc, dst: TDst,
  {
    skipCollections = false,
    copyAll = false,
  }: SimpeCloneOptions = {}): TDst {
  const srcObject = src as any;
  const dstObject = dst as any;
  const typeName = srcObject?.constructor?.name;
  if (is(typeName, [Array.name, Map.name]) && !skipCollections) errorThrow('Copy of collection not supported');
  if (typeof src === 'object' && isNot(typeName, [Date.name])) dst != null ?
    Object.keys((copyAll ? src : dst) as object).forEach(prop =>
      dstObject[prop] = processIfLeftNotNull(
        srcObject[prop], dstObject[prop],
        (s, d) => simpleFieldClone(s, d, {skipCollections, copyAll})
      )) : errorThrow('Inner objects must be inizialized before clone method invoked');
  else dst = src as any as TDst;
  return dst;
}

export function processIfLeftNotNull<TLeft, TRight>(
  left: TLeft | null | undefined, right: TRight, action: (l: TLeft, r: TRight) => TRight,
): TRight | null | undefined {
  if (left === null) return null;
  if (left === undefined) return undefined;
  return action(left, right);
}

export interface SimpeCloneOptions {
  skipCollections?: boolean;
  copyAll?: boolean,
}

export function is<T>(node: T, stack: T[]): boolean {
  return stack.findIndex(v => node === v) !== -1;
}

export function isNot<T>(node: T, stack: T[]): boolean {
  return stack.findIndex(v => node === v) === -1;
}

export function transform<TNode, TResultFunction>(node: TNode, func: (node: TNode) => TResultFunction) {
  func(node);
  return node;
}

export function toBase64(file: File, callback: (result: string) => void) {

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result!.toString());
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export function toError(error: unknown) {
  if (error instanceof Error) {
    return error;
  } else if (typeof error === 'string') {
    return new Error(error);
  } else if (error instanceof Object) {
    return new Error(JSON.stringify(error));
  }
  return new Error(`${error}`);
}

export function getKeys<T extends object>(value: T) {
  return Object.keys(value) as (keyof T)[];
}
