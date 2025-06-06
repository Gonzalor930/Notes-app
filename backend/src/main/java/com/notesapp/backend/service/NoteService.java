package com.notesapp.backend.service;

import com.notesapp.backend.model.Note;
import com.notesapp.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Note> getById(Long id) {
        return noteRepository.findById(id);
    }

    public void delete(Long id) {
        noteRepository.deleteById(id);
    }

    public Note update(Note updatedNote) {
        return noteRepository.save(updatedNote);
    }

    public Note toggleArchive(Long id) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setArchived(!note.isArchived());
        return noteRepository.save(note);
    }
}

