import { Fragment, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { tv } from "tailwind-variants";

export function Dropdown({
  button,
  children,
}: {
  button: ReactNode;
  children: ReactNode;
}) {
  return (
    <Menu>
      {button}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg",
            "divide-slate-900  bg-slate-950 shadow-white/10 ring-1 ring-black ring-opacity-5",
            "focus:outline-none",
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const item = tv({
  base: "group flex w-full items-center rounded-md px-3 py-2 text-sm font-semibold ui-disabled:opacity-50",
  variants: {
    color: {
      default: "ui-active:bg-slate-800 text-white",
      danger: "ui-active:bg-red-500 ui-active:text-white text-red-400",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export type ItemProps = ComponentPropsWithoutRef<"button"> & {
  color?: "default" | "danger";
};

Dropdown.Button = Menu.Button;

function Item({ disabled, children, color, ...props }: ItemProps) {
  return (
    <Menu.Item disabled={disabled}>
      <button {...props} className={item({ color })}>
        {children}
      </button>
    </Menu.Item>
  );
}

Dropdown.Item = Item;
