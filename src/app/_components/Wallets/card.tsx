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
} from "@nextui-org/react";
import { EssentialWallet } from "@prisma/client";
import { FaCreditCard } from "react-icons/fa";


export default function WalletCard({
  wallet,
}: {
  wallet: EssentialWallet;
}) {

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
