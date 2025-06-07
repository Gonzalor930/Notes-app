package com.notesapp.backend.controller;


import com.notesapp.backend.model.Note;
import com.notesapp.backend.service.NoteService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return noteService.create(note);
    }

    @GetMapping("/active")
    public List<Note> getActiveNotes() {
        return noteService.getAll(false);
    }

    @GetMapping("/archived")
    public List<Note> getArchivedNotes() {
        return noteService.getAll(true);
    }

    @PutMapping("/{id}")
public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
    return noteService.updateNote(id, updatedNote);
}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        noteService.delete(id);
    }

    @PatchMapping("/{id}/toggle-archive")
    public Note toggleArchive(@PathVariable Long id) {
        return noteService.toggleArchive(id);
    }

    @GetMapping("/{id}")
public Note getNoteById(@PathVariable Long id) {
    return noteService.getById(id);
}

@PatchMapping("/{noteId}/add-category/{categoryId}")
public Note addCategoryToNote(@PathVariable Long noteId, @PathVariable Long categoryId) {
    return noteService.addCategory(noteId, categoryId);
}

@PatchMapping("/{noteId}/remove-category/{categoryId}")
public Note removeCategoryFromNote(@PathVariable Long noteId, @PathVariable Long categoryId) {
    return noteService.removeCategory(noteId, categoryId);
}


}
