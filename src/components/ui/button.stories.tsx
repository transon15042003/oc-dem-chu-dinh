import type { Meta, StoryObj } from "@storybook/react";
import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "Đặt bàn ngay",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "brand",
    children: (
      <>
        <Phone className="size-4" />
        Gọi hotline
      </>
    ),
  },
};
