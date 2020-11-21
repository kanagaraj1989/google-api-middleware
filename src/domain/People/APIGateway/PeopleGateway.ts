import People from "../model/People";
import { OAuth2Client } from "google-auth-library";
import Logger from '../../../util/logger/Logger';
import {google} from "googleapis";

export default class PeopleGateway {

  public async getPeople(oAuthClient: OAuth2Client): Promise<People[]> {
      const apiResponse = await this.sendGetPeopleListRequest(oAuthClient)
      if (apiResponse) {
        return apiResponse;
      }
      return this.getMockedPeopleList();
  }

  public getMockedPeopleList(): People[] {
    const people = [
      {name: 'raghu', email: 'raghu@gmail.com', phoneNo: '7890123456'},
      {name: 'anbu', email: 'anbhu@gmail.com', phoneNo: '7890123456'},
      {name: 'prabhu', email: 'prabhu@gmail.com', phoneNo: '0123456789'},
      {name: 'ram', email: 'ram@gmail.com', phoneNo: '3456789012'},
      {name: 'alan', email: 'alan@gmail.com', phoneNo: '0123456789'},
      {name: 'raj', email: 'raj@gmail.com', phoneNo: '1234567890'},
      {name: 'viki', email: 'viki@gmail.com', phoneNo: '1234567890'},
      {name: 'clinton', email: 'clinton@gmail.com', phoneNo: '1234567890'},
      {name: 'hiran', email: 'hiran@gmail.com', phoneNo: '3456127890'},
      {name: 'pradeep', email: 'pradeep@gmail.com', phoneNo: '5671234890'},
      {name: 'lithvik', email: 'lithvik@gmail.com', phoneNo: '5671234890'},
      {name: 'dinesh', email: 'dinesh@gmail.com', phoneNo: '5671234890'},
      ] as People[];
    return people;
  }

  public async sendGetPeopleListRequest(auth: OAuth2Client): Promise<People[] | null> {
    try {
      const service = google.people({version: 'v1', auth});
      const apiRespoese = await service.people.connections.list({
        resourceName: 'people/me',
        pageSize: 10,
        personFields: 'names,emailAddresses,phoneNumbers',
      });

      const connections = apiRespoese.data.connections;
      const people: People[] = [];
      if (connections) {
        Logger.info(`successfully get people list from people api=${connections.length}`);
        connections.forEach((person) => {
          const per = {
            name :person.names? person.names[0]: '',
            phoneNo: person.phoneNumbers? person.phoneNumbers[0]: '',
            email: person.emailAddresses? person.emailAddresses[0]: ''
          } as People;
          people.push(per);
        });
      }
      return people;
    } catch (error: any) {
      Logger.error(`error message from people api=${error.message}`);
      return null;
    }
  }
}
