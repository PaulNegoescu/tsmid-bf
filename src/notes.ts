import { ApiHelper } from './apiHelper/apiHelper';
import { Note, NoteWithUser } from './noteTypes';
import { authInfo } from './auth/auth';

document
  .querySelector<HTMLButtonElement>('[data-add-note]')
  ?.addEventListener('click', handleAddNewNote);

const template = document.getElementById(
  'notes-template'
) as HTMLTemplateElement | null;
const container = document.querySelector<HTMLElement>('[data-notes-container]');

const api = new ApiHelper<Note>('/notes');

function handleAddNewNote() {
  if (!template || !container) return;
  const newNote = template.content.cloneNode(true) as DocumentFragment;
  const noteElem = newNote.querySelector<HTMLElement>('[data-note]');
  noteElem?.addEventListener('input', handleNoteContentChange);
  newNote
    .querySelector('[data-save-note]')
    ?.addEventListener('click', handleSave);

  container.append(newNote);
  return noteElem;
}

function handleNoteContentChange(this: HTMLElement) {
  this.querySelector<HTMLButtonElement>('[data-save-note]')!.disabled = false;
}

async function handleSave(this: HTMLButtonElement) {
  const elem = this.closest<HTMLElement>('[data-note]')!;
  const noteId = elem.dataset.note;

  if (!noteId) {
    const createdNote = await createNote(elem);
    if (createdNote) {
      elem.dataset.note = String(createdNote.id);
      console.log(createdNote);
      this.disabled = true;
    }
  }
}

function createNote(noteElem: HTMLElement) {
  const title = noteElem.querySelector('h2')?.textContent;
  const content = noteElem.querySelector('div')?.textContent;

  if (
    !authInfo.user ||
    typeof title !== 'string' ||
    typeof content !== 'string'
  )
    return;

  const newNote: NoteWithUser = {
    title,
    content,
    color: '#bada55',
    dateAdded: new Date().toISOString(),
    userId: authInfo.user.id,
  };

  return api.create<Note>(newNote, { accessToken: authInfo.accessToken });
}

// IIFE
(async function init() {
  const data = await api.getAll({
    search: { userId: String(authInfo.user?.id) },
  });

  for (const note of data) {
    const noteElem = handleAddNewNote();
    if (!noteElem) continue;
    noteElem.querySelector('h2')!.textContent = note.title;
    noteElem.querySelector('div')!.textContent = note.content;
  }
})();
