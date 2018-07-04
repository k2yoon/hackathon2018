import { LoadUsers, LoadUsersSuccess} from '../actions';
import { initialState, reducer } from './users';

describe('Home page', () => {
  describe('user reducer', () => {
    it('sets the flag for a progress indicator while loading users', () => {
      const loadAction = new LoadUsers();
      const loadSuccessAction = new LoadUsersSuccess({ users: [] });

      const beforeLoadingState = reducer(initialState, {} as any);
      expect(beforeLoadingState.loading).toBe(false);

      const whileLoadingState = reducer(beforeLoadingState, loadAction);
      expect(whileLoadingState.loading).toBe(true);

      const afterLoadingState = reducer(whileLoadingState, loadSuccessAction);
      expect(afterLoadingState.loading).toBe(false);
    });
  });
});
