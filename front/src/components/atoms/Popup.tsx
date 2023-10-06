import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { CardAtom } from "./CardAtom";

type PopupProps = {
    children: ReactNode;
    open: boolean;
};

export const Popup = ({ children, open }: PopupProps) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <CustomTransition>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </CustomTransition>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <CustomTransition>
                            <Dialog.Panel className="relative transform shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <CardAtom>{children}</CardAtom>
                            </Dialog.Panel>
                        </CustomTransition>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const CustomTransition = ({ children }: { children: ReactNode }) => (
    <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        {children}
    </Transition.Child>
);
