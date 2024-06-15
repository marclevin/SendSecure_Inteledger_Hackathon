"use client";

import React from "react";
import {
    Button,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Card,
} from "@nextui-org/react";
import { type FormState } from "react-dom";
import { type ActionFunction } from "$/src/utils/types";

type CreateWalletModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    createWalletAction: ActionFunction;
    walletCreatedState: FormState | null;
    communityId: string; // Pass the community ID to the modal
};

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({
    isOpen,
    onOpenChange,
    createWalletAction,
    walletCreatedState,
    communityId,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                <form action={createWalletAction}>
                    <ModalHeader className="flex flex-col gap-1">
                        New Wallet
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            name="name"
                            label="Name"
                            placeholder="Enter the wallet name"
                            required
                        />
                        <Input
                            name="walletAddress"
                            label="Wallet Address"
                            placeholder="Enter the wallet address"
                            required
                        />
                        <Input
                            name="imageUrl"
                            className="text-sm"
                            label="Image URL"
                            placeholder="Wallet image URL"
                        />
                        <Input
                            name="balance"
                            type="number"
                            className="text-sm"
                            label="Balance"
                            placeholder="Initial balance"
                            required
                        />
                        {/* Hidden input to pass the community ID */}
                        <input type="hidden" name="communityId" value={communityId} />
                        {walletCreatedState?.success === false && (
                            <Card className="flex w-full flex-col items-center bg-danger-100 p-2">
                                Failed to create wallet: {walletCreatedState.message}
                            </Card>
                        )}
                        {walletCreatedState?.success === true && (
                            <Card className="flex w-full flex-col items-center bg-success-100 p-2">
                                {walletCreatedState.message}
                            </Card>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit">Create</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default CreateWalletModal;
