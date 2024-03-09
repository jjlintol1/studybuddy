"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

const SideBarContent = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // if (item.route === "/profile") {
        //   if (userId) {
        //     item.route = `${item.route}/${userId}`;
        //   } else {
        //     return null;
        //   }
        // }

        return (
          <Link
            href={item.route}
            key={item.route}
            className={`${
              isActive
                ? "rounded-lg bg-primary-500 text-light-900"
                : "bg-transparent text-dark-300"
            } flex items-center justify-start gap-4 p-4`}
          >
            <Image src={item.imgURL} alt={item.label} width={20} height={20} />
            <p
              className={`${
                isActive ? "base-bold" : "base-medium"
              } max-lg:hidden`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto rounded-xl border-r bg-light-900 p-6 pt-28 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <SideBarContent />

      <div className="flex flex-col gap-3">
        <Link href="/sign-in">
          <Button className="small-medium btn-secondary w-full rounded-lg px-4 py-3">
            <Image
              src="/assets/icons/account.svg"
              alt="sign in"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="invert-0 dark:invert max-lg:hidden">Log In</span>
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="small-medium light-border-2 text-dark400_light900 btn-tertiary w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/sign-up.svg"
              alt="sign up"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="invert-0 max-lg:hidden">Sign Up</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LeftSidebar;
