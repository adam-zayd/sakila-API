package com.example.sakila.dto;

import jakarta.validation.groups.Default;

public class ValidationGroup {

    public interface Create extends Default{
    }
    public interface Replace extends Default{

    }
    public interface Update extends Default{
    }
}
