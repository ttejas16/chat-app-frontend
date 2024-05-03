import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./popover";
import { Button } from "./button";
import { Squirrel } from "lucide-react";
import { useState } from "react";

const emojis = [
  { emojiName: 'snake', emoji: '🐍️' },
  { emojiName: 'bird', emoji: '🕊️' },
  { emojiName: 'camel', emoji: '🐪️' },
  { emojiName: 'porcupine', emoji: '🦔️' },
  { emojiName: 'turtle', emoji: '🐢️' },
  { emojiName: 'flamingo', emoji: '🦩️' },
]
function CustomEmojiPicker({ onEmojiClick }) {
  const [emojiOpen, setEmojiOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={() => setEmojiOpen(!emojiOpen)} size={"icon"}>
          <Squirrel size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="rounded-full py-1">
        <div className="p-0">
          {emojis.map((data, index) => {
            return (
              <Button key={index} onClick={onEmojiClick} name={data.emojiName} size="icon" variant="ghost" className="text-xl">
                {data.emoji}
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CustomEmojiPicker;