package com.journal.journalApp.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @NonNull
    @Schema(name = "The user's username")
    private String userName;
    private String email;
    private boolean sentimentAnalysis;
    @NonNull
    private String password;
}
