import { Injectable, inject } from "@angular/core";
import { ContentService } from "../../../common/help/services/FirestoreService";
import { Newspaper } from "../models/Newspaper";

@Injectable({providedIn: 'root'})
export class NewspaperRepository{
    private readonly table = 'newspapers'
    private readonly firestore = inject(ContentService);
    findByPid(pid: string){
        return this.firestore.findByPid<Newspaper>(this.table, pid);
    }
    getAll() {
        return this.firestore.getAll<Newspaper>(this.table);
    }
    get(id: string){
        return this.firestore.get<Newspaper>(this.table, id);
    }
    update(newspaper: Newspaper){
        return this.firestore.update(this.table, newspaper);
    }
    add(newspaper: Newspaper){
        return this.firestore.add(this.table, newspaper);
    }
    delete(id: string){
        return this.firestore.delete(this.table, id);
    }
}

