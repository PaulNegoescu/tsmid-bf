export type NoteWithoutId = {
  title: string,
  content: string,
  color: string,
  dateAdded: string,
}

export type NoteWithUser = NoteWithoutId & { userId: number };

export type Note = NoteWithUser & { id: number };
