import { Injectable, inject } from "@angular/core";
import { Book } from "../models/Book";
import {ContentService} from "@common/help/services/content.service";

@Injectable({providedIn: 'root'})
export class BookRepository{

    private readonly table = 'books'
    private readonly firestore = inject(ContentService);

    findByPid(pid: string){
        return this.firestore.findByPid<Book>(this.table, pid);
    }

    getAll() {
        return this.firestore.getAll<Book>(this.table);
    }
    get(id: string){
        return this.firestore.get<Book>(this.table, id);
    }
    update(book: Book){
        return this.firestore.update(this.table, book);
    }
    add(book: Book){
        return this.firestore.add(this.table, book);
    }
    delete(id: string){
        return this.firestore.delete(this.table, id);
    }
}

