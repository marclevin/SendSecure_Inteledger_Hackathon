"use client";

import Container from "../_components/Container/container";
import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useFormState } from "react-dom";
import { api } from "$/src/trpc/react";
import CommunityCard from "../_components/Community/CommunityCard";
import CreateCommunityModal from "../_components/Modals/createCommunityModal"; // Import the modal
import { createCommunity } from "$/src/server/actions/community"; // Import the action
import { FaPlus } from "react-icons/fa"; // Import FaPlus icon

export default function CommunityOverview() {
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // useDisclosure hook for modal

  const communities = api.community.get.useQuery({
    userId: user?.id ?? "",
  });

  const [communityCreatedState, createCommunityAction] = useFormState( // useFormState for community creation
    createCommunity,
    null,
  );

  return (
    <Container className="flex flex-col items-center">
      <div className="relative w-full">
        <Button
          isIconOnly
          className="absolute right-0 top-0 m-4" // Add button styling
          onPress={onOpen} // Trigger modal on button click
        >
          <FaPlus /> {/* Plus icon for the button */}
        </Button>
      </div>
      {communities.data && (
        <div className="grid w-full grid-cols-1 gap-2 overflow-scroll p-4 md:grid-cols-3 xl:grid-cols-4">
          {communities.data.data.map((com) => (
            <CommunityCard key={com.id} community={com}></CommunityCard>
          ))}
        </div>
      )}

      <CreateCommunityModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        createCommunityAction={createCommunityAction}
        communityCreatedState={communityCreatedState}
      />
    </Container>
  );
}
