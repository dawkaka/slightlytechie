import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import * as Avatar from '@radix-ui/react-avatar';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useAtom } from "jotai";
import { stateAtom } from "../jotai";
import { useState } from "react";
import ToastD from "./Toast";


const Tour = ({ open, setOpen }: { open: boolean, setOpen: (b: boolean) => void }) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Tour
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-600 mt-[10px] mb-5 text-[15px] leading-normal" asChild>
                        <div className="spay-y-2">
                            <p>1. Make changes to your profile by clicking the avatar at the top left corner.</p>
                            <p>2. Write posts by clicking the pencil icon at the top right corner</p>
                            <p>3. View all posts by clicking the grid icon on the top riht corner</p>
                        </div>
                    </Dialog.Description>

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button
                                onClick={close}
                                className="bg-violet-400 text-white hover:bg-violet5 focus:shadow-violet7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                Done
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal >
        </Dialog.Root >
    )
};

export default Tour