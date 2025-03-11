import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Star } from "lucide-react";

export default function HappyUsers() {
  return (
    <div className="mx-auto mt-8 flex w-fit flex-col items-center gap-2 sm:flex-row">
      <span className="mx-4 inline-flex items-center -space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Avatar className="size-12 border" key={index}>
            <AvatarImage
              src={`/imgs/users/${index + 6}.png`}
              alt="placeholder"
            />
          </Avatar>
        ))}
      </span>
      <div className="flex flex-col items-center gap-1 md:items-start">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="size-5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <p className="text-left font-medium text-muted-foreground">
          from 99+ happy users
        </p>
      </div>
    </div>
  );
}
