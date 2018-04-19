import u from 'updeep';

import Actioner from 'actioner';
import { object, array, string, integer } from 'json-schema-shorthand';

let actioner = new Actioner();
export default actioner;

actioner.$add( 'fetch_battle', ( battle_id ) => ({ battle_id }) );
actioner.$add( 'fetch_battle_success', ( battle ) => ({ battle }) );

actioner.$add( 'auth_user', ( player, password ) => ({ player, password }) );
actioner.$add( 'auth_user_success', ( player, token ) => ({ player, token }) );

actioner.$add( 'logout' );

actioner.$add( 'select_object', object_id =>({ object_id })  );
actioner.$add( 'center_on', coords => ({ coords }) );
