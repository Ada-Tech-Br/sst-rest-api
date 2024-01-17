import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.date(),
  content: z.string(),
});

export const CreateNoteSchema = NoteSchema.omit({
  id: true,
  created_at: true,
});

export const UpdateNoteSchema = NoteSchema.pick({ content: true });

export type Note = z.infer<typeof NoteSchema>;
export type CreateNote = z.infer<typeof CreateNoteSchema>;
export type UpdateNote = z.infer<typeof UpdateNoteSchema>;
