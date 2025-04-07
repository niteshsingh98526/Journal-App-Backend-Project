package com.journal.journalApp.dto;

import com.journal.journalApp.enums.Sentiment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JournalDTO {

    private String id;
    private String title;
    private String content;
    private Sentiment sentiment;
}
