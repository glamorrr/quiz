import { Link as ReactRouterLink } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import peep from './peep.png';

const CompletedQuizNotFound = ({ ...rest }) => {
    return (
        <Flex
            display="flex"
            direction="column"
            alignItems="center"
            shadow="base"
            p={8}
            pt={4}
            rounded="lg"
            {...rest}
        >
            <Image
                mx="auto"
                src={peep}
                alt=""
                w="150px"
                h="198px"
                htmlWidth="150"
                htmlHeight="198"
                fallbackSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAQAAAAjztcLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAITgAACE4AUWWMWAAAAAHdElNRQfmAhsMCAVAuFYiAAAAtUlEQVQI1wGqAFX/AAAAAAAAADgAAAGZAP8AAAABAAAAAAANBUgRGAC8A9fnAAQAAA0AAiJBfDIc8PQT13sABMgAqADc/GoAGQbTBVEAtQAE8QA3C08fDvz5+Az5CADFAAEAActQFoYIJfb//sX9uPz7BJYPCUcIKAoABAD9PgQ38eEEJgYAEPkA9QD5AAD5BcbtuAQJ8QmsB/cHBw0E4ePEnnDYAP8AmAXeEP8U/xXSDwwBXwB8GjcWwTSEagAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wMi0yN1QxMjowNzo1NyswMDowMO11vp8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDItMjdUMTI6MDc6NTcrMDA6MDCcKAYjAAAAAElFTkSuQmCC"
            />
            <Text textAlign="center" color="gray.500">
                Kamu belum pernah mengerjakan kuis.
                <br />
                Ayo mulai!
            </Text>
            <Button
                as={ReactRouterLink}
                to="/quiz/new"
                leftIcon={<AddIcon boxSize={4} />}
                colorScheme="blue"
                size="lg"
                mt={6}
            >
                Kerjakan Kuis
            </Button>
        </Flex>
    );
};

export default CompletedQuizNotFound;
