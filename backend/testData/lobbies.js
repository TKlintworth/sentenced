lobbies['abc123'] = {
    id: 'abc123',
    serverName: 'Join my game!',
    hostPlayerName: 'Test Host',
    password: 'password',
    createdAt: new Date(),
    userCount: 4,
    maxUsers: 10,
    status: 'finished',
    messages: [],
  };
  
  lobbies['def456'] = {
    id: 'def456',
    serverName: 'bubbys room',
    hostPlayerName: 'Another Test Host',
    password: '',
    createdAt: new Date(),
    userCount: 2,
    maxUsers: 2,
    status: 'playing',
    messages: [],
  };
  
  lobbies['ghi789'] = {
    id: 'ghi789',
    serverName: 'pleasure place to please people',
    hostPlayerName: 'Yet Another Test Host',
    createdAt: new Date(),
    userCount: 1,
    maxUsers: 4,
    status: 'waiting for players',
    messages: [],
  };

export default lobbies;