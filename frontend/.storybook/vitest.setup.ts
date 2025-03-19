import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@chromatic-com/storybook";
import * as projectAnnotations from "./preview";

const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);