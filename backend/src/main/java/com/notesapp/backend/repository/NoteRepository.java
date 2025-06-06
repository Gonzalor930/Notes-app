package com.notesapp.backend.repository;

import com.notesapp.backend.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByArchived(boolean archived);
}
