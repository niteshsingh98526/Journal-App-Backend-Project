package com.journal.journalApp.service;

import com.journal.journalApp.entity.User;

import java.util.List;

public interface UserService {

    public void saveNewUser(User user);
    public void saveUser(User user);
    public void saveAdmin(User user);

    public List<User> getAll();

    public User findByName(String userName);

    public void deleteById(String id);
}
