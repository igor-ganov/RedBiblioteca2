import {Injectable} from "@angular/core";
import {Result} from "./Result";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore/lite'
import {FirebaseAppService} from "@common/help/services/firebase-app.service";
import {toError} from "@common/help/help-fuctions";

function result404<T>(errorMessage: string): Result<T> {
  return {
    successeful: false,
    resultCode: 404,
    errorMessage,
  };
}

export function clientError<T>(errorMessage: string): Result<T> {
  return {
    successeful: false,
    errorMessage,
  };
}

function result500<T>(errorMessage: string): Result<T> {
  return {
    successeful: false,
    resultCode: 404,
    errorMessage: `Internal Server Error: ${errorMessage}`,
  };
}

function toResult<T>(result: T): Result<T> {
  return {
    successeful: true,
    result,
  };
}

@Injectable({providedIn: 'root'})
export class FirestoreService {
  private readonly firestore;

  public constructor(firebaseService: FirebaseAppService) {
    const app = firebaseService.appValue;
    this.firestore = getFirestore(app);
  }

  public async findByPid<T>(table: string, pid: string): Promise<Result<T>> {
    const q = query(collection(this.firestore, table), where("pid", "==", pid));
    try {
      const d = await getDocs(q);
      return d.docs.length === 0 ? result404(`object with public id ${pid} wasn't find in the table ${table}`) : toResult(d.docs[0].data() as T);
    } catch (e) {
      return result500(toError(e).message);
    }
  }

  public async get<T>(table: string, id: string): Promise<Result<T>> {
    const docRef = doc(this.firestore, table, id);
    try {
      const d = await getDoc(docRef);
      return toResult(d.data() as T);
    } catch (e) {
      return result500(toError(e).message);
    }
  }

  public async getAll<T>(table: string): Promise<Result<T[]>> {
    try {
      const d = await getDocs(collection(this.firestore, table));
      return toResult(d.docs.map(i => i.data() as T));
    } catch (e) {
      return result500(toError(e).message);
    }
  }

  private getDataSet(table: string) {
    return collection(this.firestore, table);
  }

  public async add<T extends { id: string; }>(table: string, data: T): Promise<Result<T>> {
    const dataSet = this.getDataSet(table);
    const id = data.id == null ? data.id : (data.id = generateId());
    try {
      await setDoc(doc(dataSet, id), data);
    } catch (e) {
      return result500(toError(e).message);
    }
    return await this.get(table, id);
  }

  public async delete<T>(table: string, id: string): Promise<Result<T>> {
    const dataSet = this.getDataSet(table);
    try {
      await deleteDoc(doc(dataSet, id));
    } catch (e) {
      return result500(toError(e).message);
    }
    return toResult(undefined as T);
  }

  public async update<T extends { id: string; }>(table: string, data: T): Promise<Result<T>> {
    const docRef = doc(this.firestore, table, data.id);
    try {
      await updateDoc(docRef, data);
    } catch (e) {
      return result500(toError(e).message);
    }
    return toResult(data);
  }
}

export function generateId(): string {
  return guidToAlphabet(crypto.randomUUID());
}

export function guidToAlphabet(guid: string) {
  const hexNumber = BigInt('0x' + guid.replace(/-/g, ''));
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  let number = hexNumber;
  while (number > 0) {
    const index = (number % BigInt(alphabet.length)) as unknown as number;
    result = alphabet[index] + result;
    number /= BigInt(alphabet.length);
  }

  return result;
}
