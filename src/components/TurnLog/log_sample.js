export default [
    {
      force: false,
      type: 'PLAY_TURN',
      timestamp: '2018-05-17T20:21:48.767Z'
    },
    {
      type: 'MOVE_OBJECTS',
      timestamp: '2018-05-17T20:21:48.776Z'
    },
    {
      object_id: 'enkidu',
      type: 'MOVE_OBJECT',
      timestamp: '2018-05-17T20:21:48.777Z',
      navigation: {
        coords: [
          100,
          102
        ],
        heading: 0,
        velocity: 2,
        trajectory: [
          {
            type: 'POSITION',
            coords: [
              100,
              100
            ]
          },
          {
            type: 'MOVE',
            delta: [
              0,
              2
            ],
            coords: [
              100,
              102
            ]
          }
        ],
        thrust_used: 0,
        maneuvers: {
          thrust: [
            -2,
            4
          ],
          bank: [
            -2,
            2
          ],
          turn: [
            -2,
            2
          ]
        }
      }
    },
    {
      object_id: 'siduri',
      type: 'MOVE_OBJECT',
      timestamp: '2018-05-17T20:21:48.782Z',
      navigation: {
        coords: [
          110,
          122
        ],
        heading: 0,
        velocity: 2,
        trajectory: [
          {
            type: 'POSITION',
            coords: [
              110,
              120
            ]
          },
          {
            type: 'MOVE',
            delta: [
              0,
              2
            ],
            coords: [
              110,
              122
            ]
          }
        ],
        thrust_used: 0,
        maneuvers: {
          thrust: [
            -2,
            4
          ],
          bank: [
            -2,
            2
          ],
          turn: [
            -2,
            2
          ]
        }
      }
    },
    {
      type: 'EXECUTE_FIRECON_ORDERS',
      timestamp: '2018-05-17T20:21:48.783Z'
    },
    {
      type: 'FIRE_WEAPONS',
      timestamp: '2018-05-17T20:21:48.784Z'
    },
    {
      type: 'CLEAR_ORDERS',
      timestamp: '2018-05-17T20:21:48.785Z'
    }
];

