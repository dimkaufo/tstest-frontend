import {AtomState} from "store/types";

export const defaultAtomState = <T>(result?: T): AtomState<T | null> => ({
    isLoading: false,
    error: null,
    result: result || null
})