/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
  Link,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import { EssentialWallet, Dependant } from "@prisma/client";
import { FaCreditCard } from "react-icons/fa";
import { api } from "$/src/trpc/react";



export default function WalletCard({
  wallet,
  dependants_all,
}: {
  wallet: EssentialWallet;
dependants_all: Dependant[];
}) {
    const { mutate: addDependant } = api.essentialWallet.addDependant.useMutation();
    const dependants = api.dependant.getByWalletID.useQuery({
        walletId: wallet.id,
        });
    const dependants_not_in_wallet = dependants_all.filter((dependant) => !dependants.data?.data.some((d) => d.id === dependant.id));
    
    // Make function to add dependant to wallet when called
    const addDependantToWallet = async (dependantId: string) => {
       addDependant({id: wallet.id, dependantId: dependantId})
    };
    // Function that when triggered adds a dependant to the wallet


  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between overflow-hidden">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={wallet.imageUrl ? wallet.imageUrl : ""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {wallet.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              Balance: R{wallet.balance}
            </h5>
          </div>
        </div>
        <Button
          as={Link}
          href={`/wallet/${wallet.id}`}
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
          className="hover:bg-foreground hover:text-white transition duration-300"
        >
          Donate
        </Button>
      </CardHeader>
      <CardBody className="space-y-3 px-3 text-small ">
        <span className="flex flex-row items-center gap-2 pt-2 font-bold overflow-hidden">
          <FaCreditCard />
          {wallet.walletAddress.replace('https://', '$')}
        </span>
        <p>{wallet.about}</p>
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
    {/* Add a drop down with all dependants not in the const */}
    <Dropdown>
        <DropdownTrigger>
          <Button color="primary" size="sm" radius="full" variant="solid">
            Add Dependant
            </Button>
        </DropdownTrigger>
        <DropdownMenu
        onAction={(key) => addDependantToWallet(key.toString())}
        >
          {dependants_not_in_wallet.map((dependant) => (
            <DropdownItem key={dependant.id}>
              {dependant.name}
            </DropdownItem>
          ))}
          </DropdownMenu>
    </Dropdown>

      </CardBody>

      <CardFooter>
        {/* {iswalletOwner && (
          <div className="space-x-4">
            <Button
              color="primary"
              radius="full"
              size="sm"
              variant={"solid"}
              onPress={onOpen}
            >
              Edit
            </Button>
            <Button
              color="primary"
              radius="full"
              size="sm"
              variant={"solid"}
              onPress={() => deletewallet(wallet.id)}
            >
              Delete
            </Button>
          </div>
        )} */}
      </CardFooter>
    </Card>
  );
}
