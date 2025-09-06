import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import {ScrollArea} from "@/shared/components/ui/scroll-area";
import Header from "@/shared/components/layout-landing/header";

export default function DashboardLayout({
  children,
}: {children: React.ReactNode}) {
  return (
    <>
      <Header/>
      <div className="flex h-screen overflow-hidden">
        <main className="w-full pt-14">
          <ScrollArea className="h-full">
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
            {children}
          </ScrollArea>
        </main>
      </div>
    </>
  );
}
