package com.journal.journalApp.dto;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {

    @NotEmpty
    private String userName;
    @NotEmpty
    private  String password;

}
