"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Header as HeaderType } from "@/types/blocks/header";
import Icon from "@/components/icon";
import Link from "next/link";
import LocaleToggle from "@/components/locale/toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu } from "lucide-react";
import SignToggle from "@/components/sign/toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header({ header }: { header: HeaderType }) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  if (header.disabled) {
    return null;
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 py-4 transition-all duration-300 backdrop-blur-sm",
        scrolled 
          ? "bg-black/60 shadow-[0_5px_30px_rgba(0,0,0,0.30)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[150rem] mx-auto px-6">
        <div className="md:max-w-7xl mx-auto">
          <nav className="hidden justify-between lg:flex">
            <div className="flex items-center gap-6">
              <Link
                href={header.brand?.url || ""}
                className="flex items-center gap-3"
              >
                {header.brand?.logo?.src && (
                  <img
                    src={header.brand.logo.src}
                    alt={header.brand.logo.alt || header.brand.title}
                    className="w-7"
                  />
                )}
                {header.brand?.title && (
                  <span className="text-xl font-bold text-white">
                    {header.brand?.title || ""}
                  </span>
                )}
              </Link>
              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList>
                    {header.nav?.items?.map((item, i) => {
                      if (item.children && item.children.length > 0) {
                        return (
                          <NavigationMenuItem
                            key={i}
                            className="text-muted-foreground"
                          >
                            <NavigationMenuTrigger className="text-white/90 hover:text-white hover:bg-white/10">
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="size-4 shrink-0 mr-2"
                                />
                              )}
                              <span>{item.title}</span>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="w-80 p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl">
                                <NavigationMenuLink>
                                  {item.children.map((iitem, ii) => (
                                    <li key={ii}>
                                      <a
                                        className={cn(
                                          "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                                        )}
                                        href={iitem.url}
                                        target={iitem.target}
                                      >
                                        {iitem.icon && (
                                          <Icon
                                            name={iitem.icon}
                                            className="size-5 shrink-0"
                                          />
                                        )}
                                        <div>
                                          <div className="text-sm font-semibold text-white">
                                            {iitem.title}
                                          </div>
                                          <p className="text-sm leading-snug text-white/70">
                                            {iitem.description}
                                          </p>
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </NavigationMenuLink>
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        );
                      }

                      return (
                        <NavigationMenuItem key={i}>
                          {(item.title === "Blog" || item.title === "博客") ? (
                            <Button
                              variant="ghost"
                              className="text-white/90 hover:text-white hover:bg-primary"
                              asChild
                            >
                              <Link href={item.url || "#"}>
                                {item.icon && (
                                  <Icon
                                    name={item.icon}
                                    className="size-4 shrink-0 mr-2"
                                  />
                                )}
                                <span>{item.title}</span>
                              </Link>
                            </Button>
                          ) : (
                            <Link
                              href={item.url || "#"}
                              className={cn(
                                "text-white/90 hover:text-white",
                                navigationMenuTriggerStyle,
                                buttonVariants({
                                  variant: "ghost",
                                })
                              )}
                            >
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="size-4 shrink-0 mr-2"
                                />
                              )}
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className="shrink-0 flex gap-3 items-center">
              {header.show_locale && <LocaleToggle />}
              <ThemeToggle />
              {header.buttons?.map((item, i) => {
                return (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button 
                      variant={item.variant}
                      className={i === 0 ? "bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:from-[#7928CA] hover:to-[#3700B3] border-0 shadow-lg" : "bg-white/10 hover:bg-white/20 border border-white/20"}
                    >
                      <Link
                        href={item.url || ""}
                        target={item.target || ""}
                        className="flex items-center gap-1"
                      >
                        {item.title}
                        {item.icon && (
                          <Icon name={item.icon} className="size-4 shrink-0" />
                        )}
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
              {header.show_sign && <SignToggle />}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex justify-between lg:hidden">
            <div className="flex items-center gap-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full border-white/10 bg-black/80 backdrop-blur-xl">
                  <SheetHeader>
                    <div className="md:max-w-7xl mx-auto">
                      <SheetTitle>
                        <div className="flex items-center gap-2">
                          {header.brand?.logo?.src && (
                            <img
                              src={header.brand.logo.src}
                              alt={header.brand.logo.alt || header.brand.title}
                              className="w-8"
                            />
                          )}
                          {header.brand?.title && (
                            <span className="text-xl font-bold text-white">
                              {header.brand?.title || ""}
                            </span>
                          )}
                        </div>
                      </SheetTitle>
                    </div>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="space-y-4 flex flex-col">
                      {header.nav?.items?.map((item, i) => {
                        if (item.children && item.children.length > 0) {
                          return (
                            <div key={i} className="px-1">
                              <Accordion type="single" collapsible>
                                <AccordionItem value="item-1" className="border-white/10">
                                  <AccordionTrigger className="text-lg text-white hover:text-white hover:no-underline">
                                    <div className="flex items-center gap-2">
                                      {item.icon && (
                                        <Icon
                                          name={item.icon}
                                          className="size-5 shrink-0"
                                        />
                                      )}
                                      <span>{item.title}</span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="flex flex-col gap-4 mt-2 pl-4">
                                      {item.children.map((iitem, ii) => (
                                        <a
                                          key={ii}
                                          className="flex items-start gap-4 py-2 text-white/80 hover:text-white"
                                          href={iitem.url}
                                          target={iitem.target}
                                        >
                                          {iitem.icon && (
                                            <Icon
                                              name={iitem.icon}
                                              className="size-5 shrink-0 mt-0.5"
                                            />
                                          )}
                                          <div>
                                            <div className="font-semibold">
                                              {iitem.title}
                                            </div>
                                            <p className="text-sm text-white/60">
                                              {iitem.description}
                                            </p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          );
                        }

                        return (
                          <a
                            key={i}
                            className="px-1 py-2 flex items-center gap-2 text-lg text-white/80 hover:text-white"
                            href={item.url}
                            target={item.target}
                          >
                            {item.icon && (
                              <Icon
                                name={item.icon}
                                className="size-5 shrink-0"
                              />
                            )}
                            <span>{item.title}</span>
                          </a>
                        );
                      })}
                    </div>

                    <hr className="border-t border-white/10 my-4" />

                    <div className="space-y-3">
                      {header.buttons?.map((item, i) => {
                        return (
                          <Button
                            key={i}
                            variant={item.variant}
                            className={
                              i === 0
                                ? "w-full bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:from-[#7928CA] hover:to-[#3700B3] border-0"
                                : "w-full bg-white/10 hover:bg-white/20 border border-white/20"
                            }
                          >
                            <Link
                              href={item.url || ""}
                              target={item.target || ""}
                              className="flex items-center justify-center gap-1 w-full"
                            >
                              {item.title}
                              {item.icon && (
                                <Icon
                                  name={item.icon}
                                  className="size-4 shrink-0"
                                />
                              )}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      {header.show_locale && <LocaleToggle />}
                      {header.show_sign && <SignToggle />}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <a href={header.brand?.url || ""} className="flex items-center gap-2">
                {header.brand?.logo?.src && (
                  <img
                    src={header.brand.logo.src}
                    alt={header.brand.logo.alt || header.brand.title}
                    className="w-8"
                  />
                )}
                {header.brand?.title && (
                  <span className="text-xl font-bold text-white">
                    {header.brand?.title || ""}
                  </span>
                )}
              </a>
            </div>

            <div className="flex items-center gap-2">
              {header.show_sign && <SignToggle />}
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
