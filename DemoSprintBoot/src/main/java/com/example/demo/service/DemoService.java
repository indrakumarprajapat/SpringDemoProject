package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Question;

@Service
public interface DemoService {

	public Question createQuestion(Question question);

	public Question updateQuestion(Question question);

	public String deleteQuestion(long id);

	public List<Question> getQuestions();

	public Question getQuestion(Long id);

}
