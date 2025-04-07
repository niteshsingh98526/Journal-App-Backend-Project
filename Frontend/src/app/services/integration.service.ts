import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { JournalEntry } from '../model/journal-entry';
import { UserEntry } from '../model/user-entry';

const API_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http:HttpClient) { }

  doLogin(request: LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(API_URL+'public/login', request)
  }

  // doLogin(credentials: { userName: string, password: string }): Observable<string> {
  //   return this.http.post<string>(API_URL, credentials, { responseType: 'text' as 'json' });
  // }

   // Get all journal entries
    getAllEntries(): Observable<JournalEntry[]> {
      return this.http.get<JournalEntry[]>(API_URL+'journal')
    }
  
    // Get a single journal entry by ID
    getEntryById(id: number): Observable<JournalEntry> {
      return this.http.get<JournalEntry>(`${API_URL+'id'}/${id}`);
    }
  
    // Create a new journal entry
    createEntry(entry: JournalEntry): Observable<JournalEntry> {
      return this.http.post<JournalEntry>(API_URL+'journal', entry);
    }
  
    // Update an existing journal entry
    updateEntry(entry: JournalEntry): Observable<JournalEntry> {
      return this.http.put<JournalEntry>(`${API_URL+'id'}/${entry.id}`, entry);
    }
  
    // Delete a journal entry
    deleteEntry(id: number): Observable<void> {
      return this.http.delete<void>(`${API_URL+'id'}/${id}`);
    }

    // Create a new journal entry
    createUser(user: UserEntry): Observable<UserEntry[]> {
      return this.http.post<UserEntry[]>(API_URL+'public/signup', user);
    }

    getUser(user: UserEntry): Observable<UserEntry[]>{
      return this.http.get<UserEntry[]>(API_URL);
    }
}
