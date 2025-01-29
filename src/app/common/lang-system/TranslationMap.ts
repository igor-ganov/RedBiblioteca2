import {LoginTextFactory} from "@app/features/login/locale/LoginText";
import {HomeTextFactory} from "@app/features/home/locale/HomeText";
import {BookTextFactory} from "@app/features/books/book/locale/BookText";
import {BooksTextFactory} from "@app/features/books/locale/BooksText";
import {NewBookTextFactory} from "@app/features/books/new-book/locale/NewBookText";
import {NewspaperTextFactory} from "@app/features/newspapers/newspapers/locale";
import {NewspapersTextFactory} from "@app/features/newspapers/locale";
import {NewNewspaperTextFactory} from "@app/features/newspapers/new-newspaper/locale";
import {AboutTextFactory} from "@app/features/about/locale";
import {AdminTextFactory} from "@app/features/admin-panel/locale";
import {FirebasePanelTextFactory} from "@app/features/admin-panel/firebase-panel/locale";
import {ContentManagerTextFactory} from "@app/features/admin-panel/content-manager/locale";
import {HomeContentTextFactory} from "@app/features/admin-panel/content-manager/home-content/locale";
import {
  ArticleContentTextFactory
} from "@app/features/admin-panel/content-manager/home-content/articles-content/locale";

export const translationMap = {
  login: {factory: new LoginTextFactory()},
  home: {factory: new HomeTextFactory()},
  book: {factory: new BookTextFactory()},
  books: {factory: new BooksTextFactory()},
  newBook: {factory: new NewBookTextFactory()},
  newspaper: {factory: new NewspaperTextFactory()},
  newspapers: {factory: new NewspapersTextFactory()},
  newNewspaper: {factory: new NewNewspaperTextFactory()},
  about: {factory: new AboutTextFactory()},
  adminPanel: {factory: new AdminTextFactory()},
  firebasePanel: {factory: new FirebasePanelTextFactory()},
  contentManager: {factory: new ContentManagerTextFactory()},
  homeContent: {factory: new HomeContentTextFactory()},
  articlesContent: {factory: new ArticleContentTextFactory()},
}
