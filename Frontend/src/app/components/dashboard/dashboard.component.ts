import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { JournalEntry } from '../../model/journal-entry';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IntegrationService } from '../../services/integration.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FootComponent } from './foot/foot.component';
import { CreateEntryComponent } from "./create-entry/create-entry.component";
import { EditEntryComponent } from "./edit-entry/edit-entry.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FootComponent, CreateEntryComponent, EditEntryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  journalEntries: JournalEntry[] = [];
  selectedEntry: JournalEntry | null = null;

  constructor(private journalService: IntegrationService, private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.loadJournalEntries();  // Load the journal entries when the dashboard is initialized
  }

  loadJournalEntries(): void {
    // Call service to get journal entries
    this.journalService.getAllEntries().subscribe(entries => {
      console.log(entries);
      this.journalEntries = entries;
    });
  }

  // Handle adding a new journal entry
  addEntry(): void {
    this.selectedEntry = null;  // Clear selected entry
    this.router.navigate(['/create-entry']);  // Redirect to Create Entry form
  }

  // Handle editing an existing journal entry
  editEntry(entry: JournalEntry): void {
    this.selectedEntry = entry;
    this.router.navigate(['/edit-entry', entry.id]);  // Redirect to Edit Entry form
  }

  // Handle deleting a journal entry
  deleteEntry(entry: JournalEntry): void {
    if (confirm(`Are you sure you want to delete the entry titled "${entry.title}"?`)) {
      this.journalService.deleteEntry(entry.id).subscribe(() => {
        this.loadJournalEntries();  // Reload the journal entries after deletion
      });
    }
  }

  // Handle logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

  private mobileScreen = window.matchMedia("(max-width: 990px)");


  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Handle dashboard-nav-dropdown-toggle click
    if (target.classList.contains('dashboard-nav-dropdown-toggle')) {
      const parentDropdown = target.closest('.dashboard-nav-dropdown');
      if (parentDropdown) {
        this.toggleClass(parentDropdown, 'show');

        // Remove "show" from child dropdowns
        parentDropdown.querySelectorAll('.dashboard-nav-dropdown').forEach(child => {
          this.renderer.removeClass(child, 'show');
        });

        // Remove "show" from other dropdowns
        parentDropdown.parentElement?.querySelectorAll('.dashboard-nav-dropdown').forEach(sibling => {
          if (sibling !== parentDropdown) this.renderer.removeClass(sibling, 'show');
        });
      }
    }

    // Handle menu-toggle click
    if (target.classList.contains('menu-toggle')) {
      if (this.mobileScreen.matches) {
        const dashboardNav = this.el.nativeElement.querySelector('.dashboard-nav');
        if (dashboardNav) this.toggleClass(dashboardNav, 'mobile-show');
      } else {
        const dashboard = this.el.nativeElement.querySelector('.dashboard');
        if (dashboard) this.toggleClass(dashboard, 'dashboard-compact');
      }
    }
  }

  private toggleClass(element: Element, className: string): void {
    if (element.classList.contains(className)) {
      this.renderer.removeClass(element, className);
    } else {
      this.renderer.addClass(element, className);
    }
  }

}
