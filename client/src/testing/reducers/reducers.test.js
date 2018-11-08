// import { SET_CURRENT_USER } from '../../actions/types';
import authReducer from '../../reducers/authReducer';

describe('authReducer', () => {
  it('Should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {},
    });
  });
});
