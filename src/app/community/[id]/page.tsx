"use client";

import Container from "../../_components/Container/container";
import {
  Button,
  Input,
  Textarea,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { type UserDetail } from "$/src/utils/types";
import { Card, Link } from "@nextui-org/react";
import {
  FaInstagram,
  FaLinkedin,
  FaPen,
  FaPlus,
  FaTimes,
  FaTwitter,
} from "react-icons/fa";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "$/src/server/actions/profile";
import { createCampaign } from "$/src/server/actions/campaign";
import { ToastContainer, toast } from "react-toastify";
import { api } from "$/src/trpc/react";
import CampaignCard from "../../_components/Campaign/card";
import WalletCard from "../../_components/Wallets/card";
import { createWallet } from "$/src/server/actions/wallet";
import CreateWalletModal from "../../_components/Modals/createWalletModal";

export default function CommunityPage({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const [edit, setEdit] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userId = params.id ? params.id[0] : undefined;

  // Get community by ID
  const community = api.community.getOne.useQuery({
    id: params.id ?? "",
  });

  const dependants = api.dependant.get.useQuery({
    communityId: params.id ?? "",
  });

  const essentialWallets = api.essentialWallet.get.useQuery({
    communityId: params.id ?? "",
  });

  const isOwner = community.data?.data?.creatorID === user?.id;

  const [campaignCreatedState, createCampaignAction] = useFormState(
    createCampaign,
    null,
  );

  const [profileUpdatedState, profileUpdatedAction] = useFormState(
    updateProfile,
    null,
  );


  const [walletCreatedState, createWalletAction] = useFormState( /* added this? */
    createWallet,
    null,
  );

  return (
    <Container>
      <div className="flex h-screen flex-col gap-4  md:flex-row">
        <Card className="flex h-[80%] w-full flex-col items-center overflow-visible p-4 md:w-4/12">
          <User
            name={community.data?.data?.name}
            description={community.data?.data?.about}
            avatarProps={{
              src: community.data?.data?.imageUrl ?? "",
              size: "lg",
              isBordered: true,
            }}
          />
          <div className="flex  flex-col items-center p-4">
            <div className="m-2 md:m-12">{community?.data?.data?.about}</div>
            <div className="mt-4 flex items-center space-x-4 ">
              {/* Add a list of dependants here that belong to the community */}
              <h3 className="mb-4 text-lg font-semibold">Dependants:</h3>
              {/* Map over Dependants and show names and small icon for photos */}
              <div className="space-y-2">
                {dependants.data?.data.map((dependant) => (
                  <div
                    key={dependant.id}
                    className="flex items-center space-x-2"
                  >
                    <Avatar
                      src={dependant.imageUrl ?? ""}
                      alt={dependant.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p className="text-md font-medium">{dependant.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="h-[80%] w-full overflow-visible p-2 md:w-8/12">
          <h3 className="mx-4 font-bold">Essential Wallets</h3>
          {isOwner && (
            <>
              <Button
                isIconOnly
                className="variant-filled absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 rounded-full"
                onPress={onOpen}
              >
                <FaPlus />
              </Button>
              <CreateWalletModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                createWalletAction={createWalletAction}
                walletCreatedState={walletCreatedState}
                communityId={params.id ?? ""}
              />
            </>
          )}
          <div className="grid w-full grid-cols-1 gap-4 overflow-hidden p-4 md:grid-cols-2 xl:grid-cols-3">
            {essentialWallets.data?.data.map((wallet) => (
              <WalletCard key={wallet.id} dependants_all={dependants.data.data} wallet={wallet} />
            ))}
          </div>

        </Card>

        <ToastContainer />
      </div>
    </Container>
  );
}