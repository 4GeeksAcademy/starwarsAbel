
export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favoritos: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'agregar_favorito':
      if (store.favoritos.find(fav => fav.uid === action.payload.uid && fav.tipo === action.payload.tipo)) {
        return store;
      }
      return {
        ...store,
        favoritos: [...store.favoritos, action.payload]
      };
    case 'eliminar_favorito':
      return {
        ...store,
        favoritos: store.favoritos.filter(fav => !(fav.uid === action.payload.uid && fav.tipo === action.payload.tipo))
      };
    default:
      throw Error('Unknown action.');
  }
}
