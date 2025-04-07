import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntegrationService } from '../../services/integration.service';
import { JournalEntry } from '../../model/journal-entry';

@Component({
  selector: 'app-journals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journals.component.html',
  styleUrl: './journals.component.css'
})
export class JournalsComponent {

  journals: JournalEntry[] = [];
    // newEntry: JournalEntry = {
    //   id: 0, title: '', content: '', date: '',
    //   Sentiment: ''
    // };
  
    constructor(private journalService: IntegrationService) {}
  
    ngOnInit(): void {
      // this.journalService.getAllEntries().subscribe(data => {
      //   this.journalEntries = data;
      // });
      this.loadJournals();
    }

  // Fetch journals from the backend
  loadJournals(): void {
    this.journalService.getAllEntries().subscribe({
      next: (data) => {
        console.log('Journals Data from API:', data); // Debugging
        this.journals = data;
      },
      error: (err) => console.error('Failed to load journals:', err),
    });
  }

  // Delete a journal (optional)
  deleteJournal(id: number): void {
    if (confirm('Are you sure you want to delete this journal?')) {
      // Call your backend API to delete the journal
      console.log('Journal deleted:', id);
    }
  }

}
