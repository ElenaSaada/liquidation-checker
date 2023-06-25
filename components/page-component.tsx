import { getLenderProfitGraph } from "@/src/query";
import {Input, Text, VStack, Button, Textarea, HStack, InputGroup, InputRightElement} from "@chakra-ui/react";
import {useState, useEffect} from "react";

export const PageComponent = () => {
    const [account, setAccount] = useState<string>('')
    const [textBox, setTextBox] = useState<string>('')

    const buttonCallback = async () => {
        setTextBox('Fetching data...')
        const result = await getLenderProfitGraph(account, 18);
        setTextBox(result);
    }

    return  (
        <VStack backgroundColor={'#161618'} py={200}>
            <Text fontSize={50} color={'#FFFFFF'}>Have I been liquidated?💧</Text>
            <HStack my={5}>
                <InputGroup>
                    <Input
                        backgroundColor={'#FFFFFF'}
                        width={500}
                        placeholder="Enter wallet address"
                        border={'none'}
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    ></Input>
                    <InputRightElement width={75}>
                        <Button
                            onClick={buttonCallback}>
                            Check
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <Textarea
                height={100}
                resize={'none'}
                value={textBox}
                width={700}
                isReadOnly
                textColor={'#FFFFFF'}
                backgroundColor={'#252525'}
                border={"none"}
                onChange={(e) => setTextBox(e.target.value)}
            ></Textarea>
        </VStack>
    )
}