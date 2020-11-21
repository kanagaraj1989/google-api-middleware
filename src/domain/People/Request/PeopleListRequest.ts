import AuthRequest from '../../OAuth/Request/AuthRequest';

export default interface PeopleListRequest extends  AuthRequest {
  page: number,
  pageSize: number
}
