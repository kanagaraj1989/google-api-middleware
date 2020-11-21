import {Credentials} from "google-auth-library";
import {createOAuthClient} from "../../OAuth/GoogleClient/GoogleOAuth2Client";
import PeopleGateway from "../APIGateway/PeopleGateway";

export default class PeopleService {
  public static async getPeople(credential: Credentials, pageNo: number, pageSize: number) {
    const oAuthClient = createOAuthClient(credential)
    const apiGateway = new PeopleGateway();
    return await apiGateway.getPeople(oAuthClient)
  }
}
