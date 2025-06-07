package com.notesapp.backend.service;

import com.notesapp.backend.model.Note;
import com.notesapp.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note create(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getAll(boolean archived) {
        return noteRepository.findByArchived(archived);
    }

    //public Optional<Note> getById(Long id) {
   //     return noteRepository.findById(id);
   // }

    public Note getById(Long id) {
    return noteRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
}


    public void delete(Long id) {
        noteRepository.deleteById(id);
    }

    public Note updateNote(Long id, Note updatedNote) {
    Note note = noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));
    
    note.setTitle(updatedNote.getTitle());
    note.setContent(updatedNote.getContent());
    note.setArchived(updatedNote.isArchived());

    return noteRepository.save(note);
}

    public Note toggleArchive(Long id) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setArchived(!note.isArchived());
        return noteRepository.save(note);
    }
    
}

