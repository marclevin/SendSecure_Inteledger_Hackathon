/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
} from "@nextui-org/react";
import { Community } from "@prisma/client";
import { FaTwitter, FaLinkedin, FaInstagram, FaLock, FaUnlock } from "react-icons/fa";
import { Span } from "next/dist/trace";

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={community.imageUrl ?? ""}
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {community.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {community.about}
            </h5>
          </div>
        </div>
        <Button
          as={Link}
          href={`/community/${community.id}`}
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
        >
          View
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{community.about}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="mt-4 flex items-center space-x-4">
          {community.public ? (
            <>
              <FaUnlock className="text-default-900" />
              <span>Public</span>
            </>
          ) : (
            <>
              <FaLock className="text-default-900" />
              <span>Private</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
