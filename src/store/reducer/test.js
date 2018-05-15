import reducer from './index';
import Actions from '../actions';

const sample_state = () => ({
    battle: {
        objects: [
            { id: 'enkidu', weaponry: { weapons: [{ id: 1 }] } },
            { id: 'siduri', weaponry: { weapons: [{ id: 1 }] } },
        ],
    },
});

test( 'show_weapon_arc', () => {
    let state = sample_state();

    state = reducer(state, Actions.show_weapon_arc('enkidu',1,true) );

    expect(state).toHaveProperty('battle.objects.0.weaponry.weapons.0.show_range',true);
    expect(state).not.toHaveProperty('battle.objects.0.weaponry.weapons.1.show_range');

    state = reducer(state, Actions.show_weapon_arc('enkidu',1,false) );

    expect(state).toHaveProperty('battle.objects.0.weaponry.weapons.0.show_range',false);
    expect(state).not.toHaveProperty('battle.objects.0.weaponry.weapons.1.show_range');
});
