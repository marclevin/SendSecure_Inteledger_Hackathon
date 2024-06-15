"use client";

import React from "react";
import {
    Button,
    Input,
    Textarea,
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

type CreateCommunityModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    createCommunityAction: ActionFunction;
    communityCreatedState: FormState | null;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
    isOpen,
    onOpenChange,
    createCommunityAction,
    communityCreatedState,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                <form action={createCommunityAction}>
                    <ModalHeader className="flex flex-col gap-1">
                        New Community
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            name="communityId"
                            label="Community ID"
                            placeholder="Enter a unique community ID"
                            required
                        />
                        <Input
                            name="name"
                            label="Name"
                            placeholder="Enter your community name"
                            required
                        />
                        <Textarea
                            name="about"
                            label="About"
                            placeholder="Tell us about your community!"
                            className="w-full"
                            required
                        />
                        <Input
                            name="imageUrl"
                            className="text-sm"
                            label="Image URL"
                            placeholder="Community image URL"
                        />
                        <label className="flex items-center">
                            <input type="checkbox" name="public" className="mr-2" /> Public
                        </label>
                        {communityCreatedState?.success === false && (
                            <Card className="flex w-full flex-col items-center bg-danger-100 p-2">
                                Failed to create community: {communityCreatedState.message}
                            </Card>
                        )}
                        {communityCreatedState?.success === true && (
                            <Card className="flex w-full flex-col items-center bg-success-100 p-2">
                                {communityCreatedState.message}
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

export default CreateCommunityModal;
