import {useContext} from 'react';
import {UserContext, UserContextValues} from '../context/UserContext';

export const useUserContext = () => useContext<UserContextValues>(UserContext);
