package com.journal.journalApp.service;

import com.journal.journalApp.entity.User;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public void saveNewUser(User user);
    public void saveUser(User user);
    public void saveAdmin(User user);

    public List<User> getAll();

    public User findByName(String userName);

    public void deleteById(ObjectId id);
}
