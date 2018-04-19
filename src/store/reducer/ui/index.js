import Actions from '../../actions';
import { actions_reducer } from '../utils';
import u from 'updeep';

export default actions_reducer({
    SELECT_OBJECT: ({ object_id }) => u({ selected_object_id: object_id }),
    CENTER_ON: ({ coords }) => u({ center_on: coords }),
});
