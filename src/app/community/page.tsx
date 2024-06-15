/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Container from "../_components/Container/container";
import {
  Button,
  CardBody,
  Input,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { api } from "$/src/trpc/react";
import UserCard from "../_components/User/user";
import CommunityCard from "../_components/Community/CommunityCard";

export default function CommunityOverview() {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    // Removed the unused users query as it's not utilized in the component.
    // Assuming `user` object contains an `id` field representing the logged-in user's ID.
    const communities = api.community.get.useQuery({
      userId: user?.id ?? "", // Use the logged-in user's ID for the query
    });

    return (
      <Container className="flex flex-col items-center">
        {communities.data && (
          <div className="grid w-full grid-cols-1 gap-2 overflow-scroll p-4 md:grid-cols-3 xl:grid-cols-4">
            {communities.data.data.map((com) => (
              <CommunityCard key={com.id} community={com}></CommunityCard>
            ))}
          </div>
        )}
      </Container>
    );
  }
