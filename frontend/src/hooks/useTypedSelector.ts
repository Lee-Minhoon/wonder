import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
