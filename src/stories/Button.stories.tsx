import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/form/Button";

const meta = {
    title: "Components/Form/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        type: "primary",
        children: "Primary Button",
    },
};

export const Default: Story = {
    args: {
        children: "Default Button",
    },
};

export const Dashed: Story = {
    args: {
        type: "dashed",
        children: "Dashed Button",
    },
};

export const Link: Story = {
    args: {
        type: "link",
        children: "Link Button",
    },
};
