import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Link } from '@chakra-ui/react';
import { useAuth } from '../utils/auth';

const NavBar = () => {
    const { user } = useAuth();

    return (
        <Flex justifyContent="center" alignItems="center" h="80px">
            {user ? (
                <Link as={ReactRouterLink} to="/dashboard">
                    Dashboard
                </Link>
            ) : (
                <Link as={ReactRouterLink} to="/">
                    Home
                </Link>
            )}
        </Flex>
    );
};

export default NavBar;
