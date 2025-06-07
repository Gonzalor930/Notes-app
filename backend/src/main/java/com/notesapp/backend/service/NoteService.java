package com.notesapp.backend.service;

import com.notesapp.backend.model.Category;
import com.notesapp.backend.model.Note;
import com.notesapp.backend.repository.CategoryRepository;
import com.notesapp.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final CategoryRepository categoryRepository;
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository,CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
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

    public Note addCategory(Long noteId, Long categoryId) {
    Note note = noteRepository.findById(noteId)
        .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

    note.getCategories().add(category);
    return noteRepository.save(note);
}

public Note removeCategory(Long noteId, Long categoryId) {
    Note note = noteRepository.findById(noteId)
        .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

    note.getCategories().remove(category);
    return noteRepository.save(note);
}

    
}

