import { Injectable, inject } from "@angular/core";
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "@angular/fire/firestore";
import { LocaleHost } from "@common/lang-system/LocaleHost";
import { Observable, catchError, from, map, of, shareReplay, switchMap, take, tap } from "rxjs";
import { Result } from "./Result";

@Injectable({providedIn: 'root'})
export class ContentService{
    private readonly firestore = inject(FirestoreService);
    private readonly localeHost = inject(LocaleHost);
    private readonly contentPath = this.localeHost.getLanguageAsync().pipe(map(lang => `content/${lang}`), shareReplay(1));

    findByPid<T>(table: string, pid: string){
        return this.contentPath.pipe(switchMap(path => this.firestore.findByPid<T>(`${path}/${table}`, pid)));
    }
    getAll<T>(table: string) {
        return this.contentPath.pipe(switchMap(path => this.firestore.getAll<T>(`${path}/${table}`)));
    }
    get<T>(table: string, id: string){
        return this.contentPath.pipe(switchMap(path => this.firestore.get<T>(`${path}/${table}`, id)));
    }
    update<T extends {id: string;}>(table: string, book: T){
        return this.contentPath.pipe(take(1), switchMap(path => this.firestore.update<T>(`${path}/${table}`, book)));
    }
    add<T extends {id: string;}>(table: string, book: T){
        return this.contentPath.pipe(take(1), switchMap(path => this.firestore.add<T>(`${path}/${table}`, book)));
    }
    delete<T>(table: string, id: string){
        return this.contentPath.pipe(take(1), switchMap(path => this.firestore.delete<T>(`${path}/${table}`, id)));
    }
}

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
function toResult<T>(result: T): Result<T>{
    return {
        successeful: true,
        result,
    };
}
@Injectable({providedIn: 'root'})
export class FirestoreService{
    private readonly firestore: Firestore = inject(Firestore);

    public findByPid<T>(table: string, pid: string): Observable<Result<T>>{
        const q = query(collection(this.firestore, table), where("pid", "==", pid));
        return from(getDocs(q)).pipe(
            map(d => d.docs.length === 0? result404(`object with public id ${pid} wasn't find in the table ${table}`) : toResult(d.docs[0].data() as T)),
            catchError(e => of(result500(e)))
        );
    }
    public get<T>(table: string, id: string){
        const docRef = doc(this.firestore, table, id);
        return from(getDoc(docRef)).pipe(map(d => d.data() as T));
    }
    public getAll<T>(table: string){
        const dataSet = this.getDataSet(table);
        return collectionData(dataSet).pipe(map(list => list.map(i => i as T)));
    }
    private getDataSet(table: string) {
        return collection(this.firestore, table);
    }

    public add<T extends {id: string;}>(table: string, data: T){
        const dataSet = this.getDataSet(table);
        const id = data.id == null ? data.id : (data.id = generateId());
        return from(setDoc(doc(dataSet, id), data as object)).pipe(map(_ => data));
    }
    public delete<T>(table: string, id: string){
        const dataSet = this.getDataSet(table);
        return from(deleteDoc(doc(dataSet, id))).pipe(map(d => d as T));
    }
    public update<T extends {id: string;}>(table: string, data: T){
        const docRef = doc(this.firestore, table, data.id);
        return from(updateDoc(docRef, data as object)).pipe(map(_ => data));
    }
}

export function generateId(): string {
    const result = guidToAlphabet(crypto.randomUUID());
    return result;
  }
  
export function guidToAlphabet(guid : string) {
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