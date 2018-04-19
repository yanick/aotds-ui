import Actions from '../../actions';
import { actions_reducer } from '../utils';
import u from 'updeep';

export default actions_reducer({
    AUTH_USER_SUCCESS: ({ player, token }) => u({ player, token }),
    LOGOUT: () => () => {},
});
