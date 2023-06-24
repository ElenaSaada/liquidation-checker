import { getLenderProfitGraph } from "@/src/query";
import {Input, Text, VStack, Button, Textarea} from "@chakra-ui/react";
import {useState, useEffect} from "react";

export const PageComponent = () => {
    const [account, setAccount] = useState<string>('')
    const [textBox, setTextBox] = useState<string>('')

    const buttonCallback = async () => {
        setTextBox('Fetching data...')
        const result = await getLenderProfitGraph(account, 18);
    }

    return  (
        <VStack>
            <Text>Have I been liquidated?</Text>
            <Input
                placeholder="Enter wallet address"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
            ></Input>
            <Button onClick={buttonCallback}>Check</Button>
            <Text></Text>
            <Textarea
                value={textBox}
                onChange={(e) => setTextBox(e.target.value)}
            ></Textarea>
        </VStack>
    )
}