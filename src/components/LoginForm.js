import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { useAuth } from '../utils/auth';

const LoginForm = ({ ...rest }) => {
    const initialFormData = {
        data: {
            email: '',
            password: '',
        },
        error: {
            email: false,
            password: false,
        },
    };
    const [formData, setFormData] = useState(initialFormData);
    const { signin } = useAuth();
    const toast = useToast();

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            data: { ...formData.data, [e.target.name]: e.target.value },
            error: { ...formData.error, [e.target.name]: false },
        }));
    };

    const onLogin = (e) => {
        e.preventDefault();
        try {
            const { email, password } = formData.data;
            signin({ email, password });
            toast({
                title: 'Login Berhasil',
                description: `Hai ${email}, selamat datang!`,
                position: 'top',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error(err);
            setFormData((prev) => ({
                ...prev,
                error: { email: true, password: true },
            }));
        }
    };

    return (
        <Box as="form" onSubmit={onLogin} {...rest}>
            <FormControl isInvalid={formData.error.email}>
                <FormLabel>Email</FormLabel>
                <Input
                    onChange={onChange}
                    value={formData.email}
                    name="email"
                    variant="filled"
                    placeholder="Email"
                    type="email"
                />
                <FormErrorMessage>Invalid credentials</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={formData.error.password}>
                <FormLabel>Password</FormLabel>
                <Input
                    onChange={onChange}
                    value={formData.password}
                    name="password"
                    variant="filled"
                    type="password"
                    placeholder="Password"
                />
                <FormErrorMessage>Invalid credentials</FormErrorMessage>
            </FormControl>
            <Button type="submit" mt={10} colorScheme="blue" w="full" size="lg">
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
