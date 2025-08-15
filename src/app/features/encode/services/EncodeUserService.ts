import { Injectable } from '@angular/core';
import { IEncodeUser } from '../models/IEncodeUser';
import { HttpClient } from '@angular/common/http';
import { IEncodeGoogleFormsSettings } from '../models/IEncodeGoogleFormsSettings';
import { IEncodeGoogleFormResponse } from '../models/IEncodeGoogleFormResponse';
import { lastValueFrom, Observable } from 'rxjs';
import { IEncodeSessionOne } from '../models/IEncodeSessionOne';
import { IEncodeSessionTwo } from '../models/IEncodeSessionTwo';
import { IEncodeUserConsent } from '../models/IEncodeUserConsent';
import { SessionsEnum } from '../constants';
import { EncodeFirestoreService } from 'src/app/core/services/encodeFirestore.service';
import {
  DocumentData,
  serverTimestamp,
  Unsubscribe,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EncodeUserService {
  private _user: IEncodeUser = null;
  private _googleFormsResponses$: Observable<IEncodeGoogleFormResponse[]> =
    null;
  private _googleFormsSubscription$: Unsubscribe;
  private _encodeTasksResources: DocumentData = null;
  private _googleFormsSettings: IEncodeGoogleFormsSettings = null;

  constructor(
    private _encodeFirestoreService: EncodeFirestoreService,
    private _http: HttpClient,
  ) {}

  // creates and stores a new user
  // returns the created user
  async createNewUser(userData: {
    name: string;
    email: string;
  }): Promise<IEncodeUser> {
    const newUserRef = this._encodeFirestoreService.getNewUserDocumentRef();
    const googleFormsResponses: IEncodeGoogleFormResponse[] =
      await this._getGoogleFormsPreFilledURLs(newUserRef.id);

    const newSessionOne: IEncodeSessionOne = {
      completed: false,
      somnolenceDegree: null,
      audios: null,
    };

    const newSessionTwo: IEncodeSessionTwo = {
      completed: false,
      perpetratorCondition: null,
      somnolenceDegree: null,
      identificationResponse: null,
      audios: null,
      imageSelectionResponse: null,
      imageSortingResponse: null,
    };

    const userConsent: IEncodeUserConsent = { hasAccepted: false, date: null };

    const newUserData: IEncodeUser = {
      uid: newUserRef.id,
      name: userData.name,
      email: userData.email,
      googleFormsResponses,
      creationDate: serverTimestamp(),
      personalInfo: null,
      sessionOne: newSessionOne,
      sessionTwo: newSessionTwo,
      healthInfo: null,
      abandonedByUser: false,
      consent: userConsent,
    };

    await this._encodeFirestoreService.createNewUser(newUserData, newUserRef);
    await this._encodeFirestoreService.incrementUserCounter();

    return newUserData;
  }

  get user(): IEncodeUser {
    return this._user;
  }

  set user(user: IEncodeUser) {
    this._user = user;
  }

  get encodeTasksResources(): DocumentData {
    return this._encodeTasksResources;
  }

  set encodeTasksResources(taskResourcesData: DocumentData) {
    this._encodeTasksResources = taskResourcesData;
  }

  // TODO
  get googleFormsResponses$(): Observable<IEncodeGoogleFormResponse[]> {
    if (this._googleFormsResponses$ == null) {
      this._googleFormsResponses$ =
        this._encodeFirestoreService.getGoogleFormsResponses$(this._user.uid);
    }

    return this._googleFormsResponses$;
  }

  get session(): SessionsEnum {
    if (
      this._user.sessionOne.completed == true &&
      this._user.sessionTwo.perpetratorCondition
    ) {
      return SessionsEnum.SessionTwo;
    } else {
      return SessionsEnum.SessionOne;
    }
  }

  async updateUserInDB() {
    if (this._user == null) {
      return;
    }
    await this._encodeFirestoreService.updateUser(this._user);
  }

  abandonTest(): Promise<void> {
    this._user.abandonedByUser = true;
    return this.updateUserInDB();
  }

  unsubscribeGoogleForms(): void {
    this._googleFormsSubscription$();
  }

  private async _getGoogleFormsPreFilledURLs(
    newUserId: string,
  ): Promise<IEncodeGoogleFormResponse[]> {
    if (this._googleFormsSettings == null) {
      const formsSettingsDoc =
        await this._encodeFirestoreService.getGoogleFormsSettings();
      if (formsSettingsDoc.exists()) {
        this._googleFormsSettings =
          formsSettingsDoc.data() as IEncodeGoogleFormsSettings;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }

    if (this._googleFormsSettings != null) {
      const options = {
        params: {
          userId: newUserId,
          formsURLs: this._googleFormsSettings.googleFormsURLs,
        },
      };

      const request$ = this._http.get<IEncodeGoogleFormResponse[]>(
        this._googleFormsSettings.generatePreFilledResponsesScriptURL,
        options,
      );
      return lastValueFrom(request$);
    }
  }
}
