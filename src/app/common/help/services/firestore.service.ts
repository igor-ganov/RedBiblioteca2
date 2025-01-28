import {Injectable} from "@angular/core";
import {catchError, from, map, Observable, of} from "rxjs";
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
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {FirebaseAppService} from "@common/help/services/firebase-app.service";

function result404(errorMessage: string): Result<any> {
  return {
    successeful: false,
    resultCode: 404,
    errorMessage,
  };
}

function result500(errorMessage: string): Result<any> {
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

  public findByPid<T>(table: string, pid: string): Observable<Result<T>> {
    const q = query(collection(this.firestore, table), where("pid", "==", pid));
    return from(getDocs(q)).pipe(
      map(d => d.docs.length === 0 ? result404(`object with public id ${pid} wasn't find in the table ${table}`) : toResult(d.docs[0].data() as T)),
      catchError(e => of(result500(e)))
    );
  }

  public get<T>(table: string, id: string) {
    const docRef = doc(this.firestore, table, id);
    return from(getDoc(docRef)).pipe(map(d => d.data() as T));
  }

  public getAll<T>(table: string) {
    return fromPromise(getDocs(collection(this.firestore, table))).pipe(map((list) => list.docs.map(i => i.data() as T)));
  }

  private getDataSet(table: string) {
    return collection(this.firestore, table);
  }

  public add<T extends { id: string; }>(table: string, data: T) {
    const dataSet = this.getDataSet(table);
    const id = data.id == null ? data.id : (data.id = generateId());
    return from(setDoc(doc(dataSet, id), data as object)).pipe(map(_ => data));
  }

  public delete<T>(table: string, id: string) {
    const dataSet = this.getDataSet(table);
    return from(deleteDoc(doc(dataSet, id))).pipe(map(d => d as T));
  }

  public update<T extends { id: string; }>(table: string, data: T) {
    const docRef = doc(this.firestore, table, data.id);
    return from(updateDoc(docRef, data as object)).pipe(map(_ => data));
  }
}

export function generateId(): string {
  const result = guidToAlphabet(crypto.randomUUID());
  return result;
}

export function guidToAlphabet(guid: string) {
  const hexNumber = BigInt('0x' + guid.replace(/-/g, ''));
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  let number = hexNumber;
  while (number > 0) {
    const index = (number % BigInt(alphabet.length)) as any as number;
    result = alphabet[index] + result;
    number /= BigInt(alphabet.length);
  }

  return result;
}
