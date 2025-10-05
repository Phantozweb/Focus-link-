
'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  cta: string;
  className: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const firstCard = newArray.shift();
        if (firstCard) {
            newArray.push(firstCard);
        }
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-80 w-full max-w-md">
      {cards.map((card, index) => {
        const isTopCard = index === cards.length - 1;
        return (
          <div
            key={card.id}
            className={cn(
              "absolute w-full h-full rounded-xl p-8 flex flex-col justify-between shadow-xl transition-all duration-700 ease-in-out",
              card.className
            )}
            style={{
              transformOrigin: "top center",
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
              opacity: index === cards.length -1 ? 1 : 1 - (index * 0.2),
              transform: isTopCard ? 'translateY(0) scale(1)' : `translateY(${index * 1}rem) scale(${1 - index * SCALE_FACTOR})`,
            }}
          >
            <div>
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-bold text-2xl mb-2 text-white">{card.title}</h3>
              <p className="text-white/80">{card.description}</p>
            </div>
            <div className="mt-6">
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-colors">
                <Link href={card.href}>
                  {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
