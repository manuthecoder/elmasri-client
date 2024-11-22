import { MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

import { usePWAInstall } from "react-use-pwa-install";
import { Icon } from "../Icon";

export function PwaInstaller() {
  const install = usePWAInstall();

  return (
    install && (
      <MenubarMenu>
        <MenubarTrigger
          onClick={install}
          className="gap-1 items-center bg-gray-100 dark:bg-neutral-800 font-light"
        >
          <span className="hidden sm:flex">Install app</span>
          <Icon className="sm:ml-2">download</Icon>
        </MenubarTrigger>
      </MenubarMenu>
    )
  );
}
