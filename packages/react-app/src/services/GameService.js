import axios from 'axios';

const getGames = async (state) => {
  try {
    const result = await axios.get(`/api/games${state ? `/${state}` : ''}`);
    return result.data;
  } catch (err) {
    console.error(`Failed to fetch games in state ${state}`, err);
    throw err;
  }
};

const getGame = async (id) => {
  try {
    const result = await axios.get(`/api/games/${id}`);
    return result.data;
  } catch (err) {
    console.error(`Failed to fetch games in state ${id}`, err);
    throw err;
  }
};

const createNewGame = async (data) => {
  try {
    const result = await axios.post('/api/games', data);
    console.log({ result });
  } catch (err) {
    console.error('Failed to create new game', err);
    throw err;
  }
};

const setGameState = (updateState) => {
  try {
    const result = axios.put(
      `/api/games${updateState.id ? `/${updateState.id}` : ''}`,
      updateState
    );
    console.log({ result, updateState });
  } catch (err) {
    console.log(`Failed to update state in ${updateState.id}`, err);
    throw err;
  }
};

export default {
  getGames,
  getGame,
  createNewGame,
  setGameState,
};
