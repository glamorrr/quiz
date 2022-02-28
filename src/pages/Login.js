import { Navigate } from 'react-router-dom';
import { Heading, Box, Text } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../utils/auth';

const Login = () => {
    const { user } = useAuth();

    if (user) return <Navigate to="/dashboard" replace />;

    return (
        <Box mt={12} mx="auto" maxW="360px">
            <Heading textAlign="center" fontSize="3xl" as="h1">
                Login
            </Heading>
            <LoginForm mt={8} />
            <Box as="form" mt={16}>
                <Text color="gray.500">Email</Text>
                <Text color="gray.900" fontSize="lg">
                    budi@gmail.com
                </Text>
                <Text mt={4} color="gray.500">
                    Password
                </Text>
                <Text color="gray.900" fontSize="lg">
                    test123
                </Text>
            </Box>
        </Box>
    );
};

export default Login;
