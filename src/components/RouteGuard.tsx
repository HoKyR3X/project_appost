import { memo, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useRootSelector } from '../store/hooks';
import { getItemFromSession } from '../functions';

type Props = { 
    isPrivate: boolean;
    redirectTo?: string;
    children?: ReactNode;
};

export const RouteGuard = memo(({ isPrivate, children, redirectTo }: Props) => {
    const userFromSession = getItemFromSession('user');
    const currentUser = useRootSelector(state => state.auth.currentUser);

    const redirect = <Redirect to={redirectTo || '/auth'} />;

    return !currentUser && !userFromSession
        ? (isPrivate ? redirect : children)
        : (isPrivate ? children : redirect)
});