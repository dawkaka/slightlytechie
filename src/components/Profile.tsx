import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import * as Avatar from '@radix-ui/react-avatar';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useAtom } from "jotai";
import { stateAtom } from "../jotai";
import { useState } from "react";


const Profile = () => {
    const [appState, setAppState] = useAtom(stateAtom)
    const [p, setP] = useState({ name: appState.profile.name, image: appState.profile.image })

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        const fs = e.currentTarget.files;
        if (fs && fs.length > 0) {
            const extInd = fs[0].name.lastIndexOf(".");
            const ext = fs[0].name.substring(extInd);
            if (![".jpeg", ".jpg", ".png"].includes(ext)) {
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setP({ ...p, image: reader.result as string })
            };
            reader.readAsDataURL(fs[0]);
        }
    }

    function saveProfile() {
        setAppState({ ...appState, profile: p })
    }

    return (

        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="items-center justify-center bg-white">
                    <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                        <Avatar.Image
                            className="h-full w-full rounded-[inherit] object-cover"
                            src={p.image}
                            alt="Avatar"
                        />
                        <Avatar.Fallback
                            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                            delayMs={600}
                        >
                            AT
                        </Avatar.Fallback>
                    </Avatar.Root>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Edit profile
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-600 mt-[10px] mb-5 text-[15px] leading-normal">
                        Make changes to your profile here. Click save when you're done.
                    </Dialog.Description>
                    <figure className="mb-[15px] flex flex-col w-full relative">
                        <figcaption className="text-violet11 text-[15px]">Profile Picture</figcaption>
                        <AspectRatio.Root ratio={1.5}>
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={p.image}
                                alt={`${appState.profile.name}`}
                            />
                        </AspectRatio.Root>
                        <div className="group relative cursor-pointer">
                            <button
                                className="absolute cursor-pointer bottom-0 right-0 text-violet11 hover:bg-violet4 focus:shadow-violet7 inline-flex h-[32px] w-[32px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none group-hover:bg-violet4"
                                aria-label="Change profile picture"
                            >
                                <Pencil1Icon height={20} width={20} />
                            </button>
                            <input type="file" className="cursor-pointer absolute bottom-0 right-0 opacity-0 h-[32px] w-[32px]" style={{ zIndex: 0 }} onChange={handleFileInput} />
                        </div>
                    </figure>
                    <fieldset className="mb-[15px] flex flex-col">
                        <label className="text-violet11 text-[15px]" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="name"
                            onChange={(e) => setP({ ...p, name: e.target.value })}
                            value={p.name}
                        />
                    </fieldset>
                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button
                                onClick={saveProfile}
                                className="bg-violet-400 text-white hover:bg-violet5 focus:shadow-violet7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                Save changes
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

export default Profile