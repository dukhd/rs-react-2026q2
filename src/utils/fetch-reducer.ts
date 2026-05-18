interface State<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  currentUrl: string | null;
}

type Action<T> =
  | { type: 'FETCH_INIT'; payload: string }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; payload: string };

export function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
        currentUrl: action.payload,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
