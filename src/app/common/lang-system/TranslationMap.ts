import {LoginComponent} from "@app/features/login/login.component";
import {LoginTextFactory} from "@app/features/login/locale/LoginText";
import {HomeComponent} from "@app/features/home/home.component";
import {HomeTextFactory} from "@app/features/home/locale/HomeText";
import {BookComponent} from "@app/features/books/book/book.component";
import {BookTextFactory} from "@app/features/books/book/locale/BookText";
import {BooksComponent} from "@app/features/books/books.component";
import {BooksTextFactory} from "@app/features/books/locale/BooksText";
import {bugComponents} from "@common/routes/routes";
import {NewBookTextFactory} from "@app/features/books/new-book/locale/NewBookText";
import {NewspaperComponent} from "@app/features/newspapers/newspapers/newspaper.component";
import {NewspaperTextFactory} from "@app/features/newspapers/newspapers/locale";
import {NewspapersComponent} from "@app/features/newspapers/newspapers.component";
import {NewspapersTextFactory} from "@app/features/newspapers/locale";
import {NewNewspaperComponent} from "@app/features/newspapers/new-newspaper/new-newspaper.component";
import {NewNewspaperTextFactory} from "@app/features/newspapers/new-newspaper/locale";
import {AboutComponent} from "@app/feature/about/about.component";
import {AboutTextFactory} from "@app/feature/about/locale";
import {AdminPanelComponent} from "@app/features/admin-panel/admin-panel.component";
import {AdminTextFactory} from "@app/features/admin-panel/locale";

export const translationMap = {
  login: {component: LoginComponent, factory: new LoginTextFactory()},
  home: {component: HomeComponent, factory: new HomeTextFactory()},
  book: {component: BookComponent, factory: new BookTextFactory()},
  books: {component: BooksComponent, factory: new BooksTextFactory()},
  newBook: {component: bugComponents.newBook, factory: new NewBookTextFactory()},
  newspaper: {component: NewspaperComponent, factory: new NewspaperTextFactory()},
  newspapers: {component: NewspapersComponent, factory: new NewspapersTextFactory()},
  newNewspaper: {component: NewNewspaperComponent, factory: new NewNewspaperTextFactory()},
  about: {component: AboutComponent, factory: new AboutTextFactory()},
  adminPanel: {component: AdminPanelComponent, factory: new AdminTextFactory()},
}
