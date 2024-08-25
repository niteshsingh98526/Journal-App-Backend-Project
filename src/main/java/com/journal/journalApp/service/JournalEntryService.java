package com.journal.journalApp.service;

import com.journal.journalApp.entity.JournalEntry;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface JournalEntryService {

    public void saveEntry(JournalEntry journalEntry, String userName);

    public void saveEntry(JournalEntry journalEntry);

    public List<JournalEntry> getAll();

    public Optional<JournalEntry> findById(ObjectId id);

    public boolean deleteById(ObjectId id, String userName);
}
