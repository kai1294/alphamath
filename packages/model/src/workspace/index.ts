import { z } from "zod";

export type WorkspaceData = z.infer<typeof WorkspaceSchema>;
export const WorkspaceSchema = z.object({
    title: z.string().optional(),

});

export type WorkspaceWindowData = z.infer<typeof WorkspaceSchema>;
export const WorkspaceWindowSchema = z.object({});

export const NoteWindowDataSchema = z.object({
    content: z.string(),
});
