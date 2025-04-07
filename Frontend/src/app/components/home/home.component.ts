import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JournalEntry } from '../../model/journal-entry';
import { IntegrationService } from '../../services/integration.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Bootstrap Modal
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  journalEntries: any[] = [];
  newEntry: JournalEntry = {
    id: 0, title: '', content: '', date: '',
    Sentiment: ''
  };

  @ViewChild('journalModal', { static: false }) modalElement!: ElementRef;
  private modalInstance: any;

  constructor(private journalService: IntegrationService) {}

  ngOnInit(): void {
    // this.journalService.getAllEntries().subscribe(data => {
    //   this.journalEntries = data;
    // });

    this.loadRecentEntries();

    // Ensure modal exists in the DOM before initializing Bootstrap Modal
    setTimeout(() => {
      if (this.modalElement?.nativeElement) {
        this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
        console.log("Modal initialized successfully!");
      } else {
        console.error("Modal element is not found in the DOM!");
      }
    }, 0); // Delay execution to ensure the template is rendered
  }

  loadRecentEntries(): void {
    this.journalService.getAllEntries().subscribe({
      next: (entries) => this.journalEntries = entries,
      error: (error) => console.error('Error fetching journal entries:', error)
    });
  }

  

  // loadRecentEntries(): void {
  //   this.journalService.getAllEntries().subscribe(entries => {
  //     this.journalEntries = entries;  
  //   });
  // }

  addEntry(): void {
    if (this.newEntry.title && this.newEntry.content) {
      this.newEntry.date = new Date().toISOString().split('T')[0]; // Set current date
      this.journalService.createEntry(this.newEntry).subscribe(entry => {
        console.log(entry);
        this.journalEntries.unshift(entry); // Add new entry to the top
        this.newEntry = { id: 0, title: '', content: '', date: '', Sentiment: '' }; // Reset form
      });
    }
  }
  
  openModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      console.error("Bootstrap modal instance is not initialized!");
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

}
