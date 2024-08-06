import {Injectable} from '@angular/core';
import {collection, doc, getDoc, getDocs, getFirestore, QueryDocumentSnapshot} from 'firebase/firestore/lite';
import {FirestoreService, generateId} from '@common/help/services/firestore.service';
import {firstValueFrom} from 'rxjs';
import {FirebaseAppService} from "@common/help/services/firebase-app.service";


@Injectable({
  providedIn: 'root'
})
export class CloneService {
  public readonly firestore;

  constructor(firebaseAppService: FirebaseAppService, private readonly firestoreService: FirestoreService) {
    this.firestore = getFirestore(firebaseAppService.appValue);
  }

  public async import(element: {}, path: string) {
    for (const node of getNodes(element, path)) {
      if (node.id) await this.importNodes(node);
    }
  }

  importNodes(node: NodeValue) {
    return firstValueFrom(this.firestoreService.add(node.parent, Object.assign({}, node.value)));
  }

  public async export(path: string, collectionDatas: StoreNode[]) {
    const exportJson = Object.create({}) as {};
    for (const collectionData of collectionDatas) {
      const elements = await this.getElements(collectionData, `${path}/${collectionData.name}`);
      addField(exportJson, collectionData.name, elements);
    }
    return exportJson;
  }

  private async getElements(data: StoreNode, path: string) {
    const elements = [];
    const collectionRef = collection(this.firestore, path);
    const docs = await getDocs(collectionRef);
    for (const doc of docs.docs) {
      const element = await this.getCollectionElement(doc, data.fields, `${path}/${doc.id}`);
      elements.push(element);
    }
    return elements;
  }

  private async getCollectionElement(doc: QueryDocumentSnapshot, fields: StoreNode[] | undefined, path: string) {
    const element = doc.data();
    await this.addChildren(element, fields, path);
    return element;
  }

  private async addChildren<T>(element: T, fields: StoreNode[] | undefined, path: string) {
    if (!fields) return;
    for (const field of fields.filter(f => f.type === 'collection' || f.type === 'object')) {
      const value = field.type === 'collection' ?
        await this.getElements(field, `${path}/${field.name}`) :
        await this.getObject(field, `${path}/${field.name}`);
      addField(element, field.name, value);
    }
  }

  private async getObject(field: StoreNode, path: string) {
    const element = await getDoc(doc(this.firestore, path));
    await this.addChildren(element, field.fields, path);
    return element;
  }
}

export function addField<T>(object: any, name: string, value: T): T {
  return object[name] = value;
}

export function* getNodes(element: {}, parent: string, id?: string): Iterable<NodeValue> {
  const currentPath = id === undefined ? parent : `${parent}/${id}`;
  if (Array.isArray(element)) yield* getNodesFromArray(element, currentPath);
  else {
    const result = Object.create({});
    for (const [property, value] of Object.entries(element)) {
      if (value === undefined || value === null) continue;
      else if (Array.isArray(value)) yield* getNodes(value, currentPath, property);
      else if (typeof value === 'object') yield* getNodes(value, currentPath, property);
      else if (typeof value === 'string' || typeof value === 'number') addField(result, property, value);
      else {
        console.error(value);
        throw Error(`Unexpected type ${typeof value} of value ${value}`);
      }
    }
    yield {value: result, parent: parent, id: id};
  }
}

function* getNodesFromArray(elements: { id: string }[], parent: string): Iterable<NodeValue> {
  for (const element of elements) {
    if (element === null || undefined) continue;
    yield* getNodes(element, parent, setId(element));
  }
}

function setId(element: { id: string }) {
  element.id = generateId();
  return element.id;
}

interface NodeValue {
  id?: string;
  parent: string;
  value: { id: string; };
}

export const StoreRoot: StoreNode[] = [
  {
    type: 'collection',
    name: 'books',
    fields: [
      {name: 'id', type: 'value'},
      {name: 'title', type: 'value'},
      {name: 'author', type: 'value'},
      {name: 'description', type: 'value'},
      {name: 'image', type: 'value'},
    ]
  },
  {
    type: 'collection',
    name: 'newspapers',
    fields: [
      {name: 'id', type: 'value'},
      {name: 'title', type: 'value'},
      {name: 'month', type: 'value'},
      {name: 'description', type: 'value'},
      {name: 'cover', type: 'value'},
    ]
  }
];
// const BookRoot: StoreNode[] = [
//   {
//     type: 'collection',
//     name: 'public',
//     fields: [
//       {name: 'id', type: 'value'},
//       {name: 'title', type: 'value'},
//       {name: 'author', type: 'value'},
//       {name: 'description', type: 'value'},
//       {name: 'image', type: 'value'},
//     ]
//   },
// ];

export interface StoreNode {
  name: string;
  type: 'value' | 'collection' | 'object';
  fields?: StoreNode[];
  value?: string | number | object;
}
