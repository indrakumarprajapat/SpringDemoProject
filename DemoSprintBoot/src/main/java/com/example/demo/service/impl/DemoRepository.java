package com.example.demo.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Question;

public interface DemoRepository extends JpaRepository<Question, Long>{

}
