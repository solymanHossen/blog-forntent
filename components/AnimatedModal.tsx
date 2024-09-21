"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

import {CreatePostForm} from "@/components/CreatedPost";

export function AnimatedModal({ triggerContent }: { triggerContent: React.ReactNode }) {

  return (
      <Modal>
        <ModalTrigger className=" text-white  group/modal-btn">
          {triggerContent}
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
          <CreatePostForm/>
          </ModalContent>
        </ModalBody>
      </Modal>
  );
}
